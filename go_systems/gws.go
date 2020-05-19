package main

import (
	//NATIVE PACKAGES
	"fmt"
	"flag"
	"net/http"
	"encoding/json"
	
	//3rd Party
	"github.com/gorilla/mux"		
	"github.com/gorilla/websocket"	
	
	
	//Our Packages
	"procon_data"
	"procon_mongo"
)

var addr = flag.String("addr", "0.0.0.0:1300", "http service address");
var upgrader = websocket.Upgrader{}

func handleAPI(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {  
		fmt.Println("Something went horribly wrong", err)
		return
	}	
	
	//procon_data.SendMsg("noop","something","Welcome", c);
	
	Loop:
		for {
			in := procon_data.Msg{}
			err := c.ReadJSON(&in)
			
			if err != nil {
				c.Close();
				break Loop
			}
			
			switch(in.Type) {
				case "get-tasks":
					tasks := procon_mongo.GetCollectionDocs("api","tasks")
					procon_data.SendMsg("noop","requested-tasks",string(tasks), c);
					break;
				case "insert-task":
					valid, err := procon_data.ValidateJWT(procon_data.PubKeyFile, in.Jwt)
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) } else if (err == nil && valid) {
						result, insert_doc_id, err := procon_mongo.InsertDocument("api","tasks",[]byte(in.Data))
						if err != nil { fmt.Println(err) } else {
							fmt.Println(result, insert_doc_id);
							tasks := procon_mongo.GetCollectionDocs("api","tasks")
							procon_data.SendMsg("noop","requested-tasks",string(tasks), c);
						}
					}
					break;
				case "update-task":
					valid, err := procon_data.ValidateJWT(procon_data.PubKeyFile, in.Jwt)
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) } else if (err == nil && valid) {
						var ut procon_data.UpdateTask
						err := json.Unmarshal([]byte(in.Data), &ut)
						if err != nil { fmt.Println(err) }else {
							procon_mongo.UpdateTask(ut.Id, ut.Task)
							tasks := procon_mongo.GetCollectionDocs("api","tasks")
							procon_data.SendMsg("noop","requested-tasks",string(tasks), c);							
						}
					}					
					break;
				case "delete-task":
					valid, err := procon_data.ValidateJWT(procon_data.PubKeyFile, in.Jwt)
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) } else if (err == nil && valid) {
						_ = procon_mongo.DeleteDocument("api","tasks", in.Data)
						tasks := procon_mongo.GetCollectionDocs("api","tasks")
						procon_data.SendMsg("noop","requested-tasks",string(tasks), c);							
					}				
					break;
				case "get-expenses":
					expenses := procon_mongo.GetCollectionDocs("api","expenses")
					procon_data.SendMsg("noop","requested-expenses",string(expenses), c);	
					break;	
				case "insert-expense":
					valid, err := procon_data.ValidateJWT(procon_data.PubKeyFile, in.Jwt)
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) } else if (err == nil && valid) {
						result, insert_doc_id, err := procon_mongo.InsertDocument("api","expenses",[]byte(in.Data))
						if err != nil { fmt.Println(err) } else {
							fmt.Println(result, insert_doc_id);
							expenses := procon_mongo.GetCollectionDocs("api","expenses")
							procon_data.SendMsg("noop","requested-expenses",string(expenses), c);	
						}						
					}				
					break;
				case "delete-expense":
					valid, err := procon_data.ValidateJWT(procon_data.PubKeyFile, in.Jwt)
					if err != nil { fmt.Println(err); procon_data.SendMsg("^vAr^", "jwt-token-invalid", err.Error(), c) } else if (err == nil && valid) {
						_ = procon_mongo.DeleteDocument("api","expenses", in.Data)
						expenses := procon_mongo.GetCollectionDocs("api","expenses")
						procon_data.SendMsg("noop","requested-expenses",string(expenses), c);						
					}						
					break;		
				default:
					break;
			}
		}
}

func main() {
	r := mux.NewRouter()
	
	r.HandleFunc("/ws", handleAPI)
		
	
	fmt.Println("Server Running...")
	http.ListenAndServeTLS(*addr, "/etc/letsencrypt/live/trash.pr0con.io/cert.pem", "/etc/letsencrypt/live/trash.pr0con.io/privkey.pem", r)
}