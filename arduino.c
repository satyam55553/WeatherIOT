#include<dht11.h>
#define DHT11PIN 4 //dht11 output on pin 4
dht11 DHT11; //Creating object of dth11 class
int sensorValue;//MQ135
void setup() {
  Serial.begin(9600);
  // put your setup code here, to run once:
}

void loop() {
  //MQ135 Sensor
  //  sensorValue = analogRead(0);
  //  Serial.print("Air Quality= ");
  //  Serial.print(sensorValue, DEC);// prints the value read
  //  Serial.println(" PPM");
  //DHT11 reading
  int chk = DHT11.read(DHT11PIN);
  Serial.print("H");
  Serial.print((float)DHT11.humidity, 2); //2 indicates digits after decimal
  Serial.print("T");
  Serial.println((float)DHT11.temperature, 2);

  delay(1000);
}