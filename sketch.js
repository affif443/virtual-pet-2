var dog,sadDog,happyDog;
var foodObj;
var foods,foodStock;
var fedTime,lastFed,feed,addFood;
var database;

function preload()
{
sadDog=loadImage("images/dogImg.png")
happydog=loadImage("images/happydog.png")
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  
  foodObj=new Food;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("feed the dog ");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}



function draw() {  
    
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
   lastFed=data.val();

  });
  
  fill(225,225,224);
  textSize(15);

  if(lastFed>=12){
   text("Last Feed:"+lastFed%12+"PM",350,30);
	  bedroom();
  }
  else if(lastFed==0){
    text("Last Feed:12AM",350,30); 
	  garden();
   }
   else {
    text("Last Feed:"+lastFed+"AM",350,30); 
	   washroom();
   }

  drawSprites();

}

  

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  dog.addImage(sadDog)
foodS++;
database.ref('/').update({
  Food : foodS
})

}

function  bedroom(){
        background(bedroomIMG,width,height);
        dog.changeAnimation("sleeping",sleepIMG);
    }

   function  garden(){
        background(gardenIMG,width,height);
        dog.changeAnimation("run",runIMG);
    }

   function  washroom(){
        background(washroomIMG,width,height);
    }
}
