prediction1 = "";


Webcam.set({
    width : 350,
    height : 280,
    crop_width: 350,
    crop_height: 262,
    crop_width: 350,
    crop_height: 269,
    image_format : 'jpeg',
    jpeg_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("pic").innerHTML = '<img src = "'+data_uri+'" id = "cap_img">'
    });
}

console.log('ml5_version',ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ZoYrcsfaD/model.json",modelLoaded);
function modelLoaded()
{
    console.log('modelLoaded successfully!');
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The First Prediction Is" + prediction1;
    var utterthis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterthis);
}

function check()
{
    img = document.getElementById("cap_img");
    classifier.classify(img,gotResult);
}

function gotResult(error,result)
{
    if (error)
    {
        console.log(error);
    }
  else
  {
      console.log(result);
  }

  document.getElementById("result_gesture_name").innerHTML = result[0].label;

  prediction1 = result[0].label;
 speak();

 if(result[0].label == "Victory"){
    document.getElementById("update_gesture").innerHTML = "&#9996;";
}
if(result[0].label == "Best"){
   document.getElementById("update_gesture").innerHTML = "&#128077;";
}
if(result[0].label == "Amazing"){
   document.getElementById("update_gesture").innerHTML = "&#128076;";
}

}
