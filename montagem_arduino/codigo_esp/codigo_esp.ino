#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

const int redLED = 6; 
const int blueLED = 3;

String winner; 

//Vetores com nomes de rede e senhas dos Access Points
const char* SSID = "Inteli-COLLEGE"
const char* PWD = "QazWsx@123"

int parar=0;
String guardaRede;

void postDataToServer() {
 
  Serial.println("Posting JSON data to server...");
  // Block until we are able to connect to the WiFi access point
  HTTPClient http;   
     
    http.begin("https://6zdsbr-3000.preview.csb.app/esp");  
    http.addHeader("Content-Type", "application/json");         
     
    StaticJsonDocument<200> doc;
    
    doc["winner"] = "none";
     
    int httpResponseCode = http.POST(requestBody);
 
    if(httpResponseCode>0){
       
      String response = http.getString();                       
       
      Serial.println(httpResponseCode);   
      Serial.println(response);
     
    }
    parar = 1; 
}
void getDataFromServer() {
 
  Serial.println("Pegando dados do Servidor...");
  // Block until we are able to connect to the WiFi access point
  HTTPClient http;   
     
    http.begin("https://6zdsbr-3000.preview.csb.app/esp");  
    http.addHeader("Content-Type", "application/json");         
     
    StaticJsonDocument<200> doc;
     
    int httpResponseCode = http.GET();
 
    if(httpResponseCode>0){
       
      String response = http.getString();                       
       
      Serial.println(httpResponseCode);   
      Serial.println(response);
      deserializeJson(doc, response);
      //Exemplo no caso de vetores/arrays no JSON
      //double latitude = doc["data"][0];
      //double longitude = doc["data"][1];

      winner = response;

    }
  
  if (winner == "Blue") {
    digitalWrite(blueLED, HIGH);
    delay(1000);
    EnviarDados(0); 
  } else if (winner = "Red") {
    digitalWrite(redLED, HIGH);
    delay(1000);
    EnviarDados(0); 
  }
}

//Função para conectar em APs sem medição FTM
void EnviarDados(int rede)
{
  Serial.println("Conectando na rede: ");
  Serial.println(rede);
  WiFi.begin(SSID,PWD);
      while (WiFi.status() != WL_CONNECTED) {
        Serial.println("Tentando novamente!");
        delay(2000);
        Serial.print(".");
        WiFi.disconnect();
        delay(2000);
        WiFi.reconnect();
        delay(2000); 
      }
      while(parar==0)
      {
        Serial.println("WiFi connected");
        //DadosConexao();
        postDataToServer();      
      }
      parar=0;
      WiFi.disconnect();
      Serial.println("Desconectei!");
}
void ReceberDados(int rede)
{
  Serial.println("Conectando na rede: ");
  Serial.println(rede);
  WiFi.begin(SSIDS[rede],PWD[rede]);
      while (WiFi.status() != WL_CONNECTED) {
        Serial.println("Tentando novamente!");
        delay(2000);
        Serial.print(".");
        WiFi.disconnect();
        delay(2000);
        WiFi.reconnect();
        delay(2000); 
      }
      while(parar==0)
      {
        Serial.println("WiFi connected");
        //DadosConexao();
        getDataFromServer();      
        delay(1000);
      }
      parar=0;
      WiFi.disconnect();
      Serial.println("Desconectei!");
}

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA); 
  pinMode(redLed, OUTPUT);
  pinMode(blueLed, OUTPUT);
}

void loop() {
  ReceberDados(0);
}
