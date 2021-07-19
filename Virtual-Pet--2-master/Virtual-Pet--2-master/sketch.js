//Create variables here
var dog
var happyDog
var database
var foodS
var foodStock

var milk
var fedTime
var lastFed

var feed
var addFood

var foodObj

function preload()
{

	//load images here
  dog = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
  milk = loadImage("Milk.png")
} 

function setup() {
  createCanvas(500, 500);

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)



  database=firebase.database()

  dog = createSprite(100,100,20,20)

  foodObj = createSprite(300,300,20,20)
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  

  background(46,139,87)
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage( "happy" ,happyDog);
    // foodS.addImage("food" , milk)
  }
textSize(50)
  text(foodS, 200, 200)
  
  drawSprites();

  dog.scale=0.3

  // database.ref("/").update({Food:foodStock})
  // background(46,139,87)
  // //add styles here

  // if(keyWentDown(UP_ARROW)){
  //   writeStock(foodS);
  //   dog.addImage( "happy" ,happyDog);

  fill(255,255,254)
  textSize(15)
  if(lastFed >=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30)
  }else if(lastFed == 0){
    text("last Feed : 12 AM", 350,30)
  }else{
    text("Last Feed : "+lastFed + " AM", 350,30)
  }


  var x = 80
  var y = 90
  if(foodS >= 0){

for(var i=0; i<foodS; i+=1){
  if(i%10){
y+=0
  }
  image(milk, x , y, 20, 20 )
  x+=10
  // var milky=createSprite(i,240, 20, 20)
  // milky.addImage(milk)
  // milky.scale=0.01
}
  }



}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog)
  foodS--
  database.ref('/').update({
    Food:foodS,
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:FoodS
  })
}