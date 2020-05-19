package procon_mongo

import(
	"fmt"
	"context"
	"encoding/json"
	
	
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
		
	"procon_data"	
)

type key string


const(
	HostKey = key("hostKey")
	UsernameKey = key("usernameKey")
	PasswordKey = key("passwordKey")
	DatabaseKey = key("databaseKey")
)

var ctx context.Context;
var client *mongo.Client;

func init() {
	ctx = context.Background()
	ctx, cancel := context.WithCancel(ctx)
	
	defer cancel()
	
	ctx = context.WithValue(ctx, HostKey, procon_data.MongoHost)
	ctx = context.WithValue(ctx, UsernameKey, procon_data.MongoUser)
	ctx = context.WithValue(ctx, PasswordKey, procon_data.MongoPassword)
	ctx = context.WithValue(ctx, DatabaseKey, procon_data.MongoDb)
	
	uri := fmt.Sprintf(`mongodb://%s:%s@%s/%s`,
		ctx.Value(UsernameKey).(string),
		ctx.Value(PasswordKey).(string),
		ctx.Value(HostKey).(string),
		ctx.Value(DatabaseKey).(string),
	)
	clientOptions := options.Client().ApplyURI(uri)
	
	var err error
	client, err = mongo.Connect(ctx, clientOptions)	
	
	err = client.Ping(ctx,nil)
	if err != nil { fmt.Println(err) }else { fmt.Println("Mongo Connected.") }
}

func InsertDocument(db string, col string, doc []byte) (bool, string, error) {
	collection := client.Database(db).Collection(col)
	var xdoc map[string]interface{}
	
	err := json.Unmarshal(doc, &xdoc)
	
	if err != nil { return false, "noop", err }	else {
		insertResult, err := collection.InsertOne(ctx, &xdoc)
		if err != nil { return false, "noop", err } else {
			return true, insertResult.InsertedID.(primitive.ObjectID).Hex(), nil
		} 
	}	
}

func DeleteDocument(db string, col string, id string) (int64) {
	docId, err := primitive.ObjectIDFromHex(id)
	if err != nil { fmt.Println(err) } else {
		deleteResult, err := client.Database(db).Collection(col).DeleteOne(ctx, bson.M{"_id": docId})
		if deleteResult.DeletedCount == 0 {
			fmt.Println("Delete Document Request Failed.", err)
		}
		return deleteResult.DeletedCount
	}
	return 0
}

func GetCollectionDocs(db string, col string) ([]byte) {
	var docs []interface{}
	
	collection := client.Database(db).Collection(col)
	cursor, err := collection.Find(ctx, bson.D{})
	
	if err != nil { fmt.Println("Error Collecting Documents")  }
	defer cursor.Close(ctx)
		
	for cursor.Next(ctx) {
		var xdoc map[string]interface{}
		err = cursor.Decode(&xdoc)
		
		if err != nil {  fmt.Println("Error Decoding Doc") }else {
			docs = append(docs, xdoc)
		}
	}
	
	jsonStr, err := json.Marshal(docs)
	if err != nil {
		fmt.Println(err);
		return []byte("Error During Doc Marshal")
	}else {
		return jsonStr
	}
}


/* Task Specific Functions */
func UpdateTask(id string, task string) {
	docId, err := primitive.ObjectIDFromHex(id)
	if err != nil { fmt.Println(err) }else {
		filter := bson.M{"_id": bson.M{"$eq": docId }}
		update := bson.M{"$set": bson.M{"task": task }}
		
		result, err := client.Database("api").Collection("tasks").UpdateOne(ctx, filter, update)
		if err != nil { fmt.Println(err) }else {
			 fmt.Println("UpdateOne() result ModifiedCount:", result.ModifiedCount);
		}
	}
}







