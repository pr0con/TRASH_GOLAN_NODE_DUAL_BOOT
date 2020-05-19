package procon_data

import(
	"io"
	"os"
	"fmt"
	"crypto/rsa"
	
	"github.com/gorilla/websocket"
	jwtgo "github.com/dgrijalva/jwt-go"
)

var(
	PubKeyFile *rsa.PublicKey
	PrivKeyFile *rsa.PrivateKey
)

const(
	PKPWD = "SOMEHARDPASSWORD"
	
	KeyCertPath = "/var/www/keycertz/"
	PrivKeyPath = "/var/www/keycertz/mykey.pem"
	PubKeyPath  = "/var/www/keycertz/mykey.pub"
	
	MongoHost = "127.0.0.1"
	MongoUser = "mongod"
	MongoPassword = "SOMEHARDPASSWORD"
	MongoDb = "admin"
)

func init() {
	f,ok,err := ReadFile(PubKeyPath)
	if(!ok || err != nil) { fmt.Println(err) } else {
		PubKeyFile, err = jwtgo.ParseRSAPublicKeyFromPEM(f)
		if err != nil {
			fmt.Println(err)
		}
	}
	f,ok,err = ReadFile(PrivKeyPath)
	if(!ok || err != nil) { fmt.Println(err) } else {
		PrivKeyFile, err = jwtgo.ParseRSAPrivateKeyFromPEMWithPassword(f, PKPWD)
		if err != nil {
			fmt.Println(err)
		}
	}		
}

type Msg struct {
	Jwt string `json:"jwt"`
	Type string `json:"type"`
	Data string `json:"data"`
}

func SendMsg(j string, t string, d string, c *websocket.Conn) {
	m := Msg{j, t, d}
	if err := c.WriteJSON(m); err != nil {
		fmt.Println(err)
	}
	
	//mm, _ := json.Marshal(m);
	//fmt.Println(string(mm));	
}

type UpdateTask struct {
	Id string `json:"id"`
	Task string `json:"task"`
}


func ValidateJWT(publickeyfile *rsa.PublicKey, jwt string) (bool, error) {
	token, err := jwtgo.Parse(jwt, func(token *jwtgo.Token) (interface{}, error) {
		return publickeyfile, nil
	})
	if err != nil { return false, err  } else if ( token.Valid && err == nil) { return true, nil}
	
	//should not get here
	return false,err
}

func ReadFile(fp string) ([]byte, bool, error) {
	var file, err = os.OpenFile(fp, os.O_RDWR, 0644)
	if err != nil { return []byte(""),false,err }
	defer file.Close()
	
	var data = make([]byte, 2048);
	for {
		_, err = file.Read(data)
		
		if err == io.EOF {
			break
		}
		
		if err != nil && err != io.EOF {
			break;
		}
	}
	fmt.Println("==> done reading from file")
	return data,true,nil	
}









