// Copyright (c) 2018 ml5
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// modified by christopher pietsch

let inputImg;
let statusMsg;
let transferBtn;
let style1;
let style2;
var i;
var files;

function setup() {
    noCanvas();
    // Status Msg
    statusMsg = select('#statusMsg');

    // Get the input image
    // inputImg = select('#inputImg');

    // Transfer Button
    // transferBtn = select('#transferBtn')
    // transferBtn.mousePressed(transferImages);

    // Create two Style methods with different pre-trained models
    style1 = ml5.styleTransfer('models/clickbait', modelLoaded);
    // style2 = ml5.styleTransfer('models/udnie', modelLoaded);


    loadBtn = select('#load');
    loadBtn.changed(function() {
        i = 0
        files = loadBtn.elt.files
        loadall()

        // var reader = new FileReader();
        // reader.onloadend = function() {
        //     // img.src = reader.result;
        //     inputImg = createImg(reader.result).parent('styleA');
        //     console.log(inputImg)
        //     setTimeout(function() { transferImages() }, 100)
        // }
        // reader.readAsDataURL(file);
        // img = createImg(file.data)
        // inputImg = img

    });
}

function loadall() {
    var file = files[i]
    console.log("file", file)
    if (file) {
        load(file, function() {
            i = i + 1;
            loadall()
        })
    }
}

// A function to be called when the models have loaded
function modelLoaded() {
    // Check if both models are loaded
    if (style1.ready) {
        statusMsg.html('Ready!')
    }
}

function load(file, clb) {
    var reader = new FileReader();
    reader.onloadend = function() {
        // img.src = reader.result;
        // console.log(reader.result)
        inputImg = createImg(reader.result).parent('styleA');
        console.log(inputImg)
        setTimeout(function() { transferImages(clb) }, 100)
    }
    reader.readAsDataURL(file);
}

// Apply the transfer to both images!
function transferImages(clb) {
    statusMsg.html('Applying Style Transfer...!');

    style1.transfer(inputImg, function(err, result) {
        // console.log("rsult", result)
        createImg(result.src).parent('styleA');
        clb()
    });

    // style2.transfer(inputImg, function(err, result) {
    //     createImg(result.src).parent('styleB');
    // });
    statusMsg.html('Done!');
}