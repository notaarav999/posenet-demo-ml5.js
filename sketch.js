let capture;  
let posenet = null;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;

function setup() {
    createCanvas(800, 500); // Create a canvas of 800x500 pixels
    
    // Create video capture from camera
    capture = createCapture(VIDEO);
    capture.size(800, 600);  // Set size of video capture to match the canvas
    capture.hide();  // Hide the default capture element (we'll draw it on the canvas)
    
    // Initialize PoseNet model
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose',receivedPoses)
}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length >0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        
    }
    console.log(noseX + " "+noseY)  
}


// PoseNet model loaded callback
function modelLoaded(){
    console.log('PoseNet model has loaded');
}

function draw() {
    // Draw the video capture on the canvas
    image(capture, 0, 0, 800, 600);
    fill(255,0,0);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x,singlePose.keypoints[i].position.y, 20);
        }

        stroke(255,255,255);
        strokeWeight(5);
        for(let j=0;j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
        }
    }
    
    // Additional drawing logic here (e.g., pose keypoints or skeleton)
}
