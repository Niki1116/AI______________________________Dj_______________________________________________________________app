song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function preload(){
  song= loadSound("music.mp3");  
}
function draw(){
    image(video,0,0,600,500);
  
    fill("#ff0015");
 stroke("#ff0015");
 if(scorerightwrist>0.2){

 
 circle(rightwristX,rightwristY,20);
 if(rightwristY>0 && rightwristY<=100 ){
     document.getElementById("speed").innerHTML="speed=0.5x";
     song.rate(0.5);
 }
 if(rightwristY>100 && rightwristY<=200 ){
    document.getElementById("speed").innerHTML="speed=1x";
    song.rate(1);
}
if(rightwristY>200 && rightwristY<=300 ){
    document.getElementById("speed").innerHTML="speed=1.5x";
    song.rate(1.5);
}
    if(rightwristY>300 && rightwristY<=400 ){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }

    if(rightwristY>400 && rightwristY<=500 ){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
}
 if (scoreleftwrist>0.2){
    circle(leftwristX , leftwristY ,20);
    innumberleftwristY=Number(leftwristY);
    remove_decimals=floor(innumberleftwristY);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);  
 }



}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function  modelLoaded(){
    console.log("modelLoaded !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    
}
function gotPoses (results){
if (results.length>0){
       console.log(results);
       scorerightwrist=results[0].pose.keypoints[10].score;
       scoreleftwrist=results[0].pose.keypoints[9].score;
       console.log("scoreleftwrist="+scoreleftwrist +"scorerightwrist="+scorerightwrist);
       leftwristX=results[0].pose.leftWrist.x;
       leftwristY=results[0].pose.leftWrist.y;
       console.log("leftwristX"+ leftwristX + "leftwristY= "+ leftwristY);
       rightwristX=results[0].pose.rightWrist.x;
       rightwristY=results[0].pose.rightWrist.y;
       console.log("rightwristX"+ rightwristX + "rightwristY= "+ rightwristY);
       
}
}