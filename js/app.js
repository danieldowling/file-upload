$(document).ready(function(){

//initialize the state of elements on pageload
$('.upload-file').hide();
$('.upload-again').hide();
$('.file-loading').hide();
$('.upload').addClass('active');
$('#new-file-counter').hide();

var selectedFile = [];
var fileToUpload = [];
var uploadedFiles = [];

var result = '';
var uploadedFilesLength = '';

$('input[type=file]').change(function(e){
  //check size of file to be uploaded, if less that 50kb
  //if file under 50kb, push file to array
  var fileSelectedSize = this.files[0].size / 1024;
  fileSelectedSize = (Math.round(fileSelectedSize * 100) / 100);
  if (fileSelectedSize <= 50) {
    //removes the c://fakefilepath from selected file and adds the
    //selected file to an array
    selectedFile.unshift($('input[type=file]').val().split('\\').pop());
    fileToUpload = selectedFile[0];
    console.log(fileToUpload);
    $('#file-name').text(fileToUpload);
    uploadedFiles.pop();
    showUploadFile();
  } else {
    //if file is larger than 50kb, user will recieve alert message preventing
    //them from uploading file
    alert('File is too large, please try again.');
  };
});

//simulates uploading a file by setting an interval to run until the width of
//the progress bar is equal to or greater than 100%,
$('.upload-button').click(function(e){
  fileLoading();
  var width = 1;
  var elem = document.getElementById('upload-progress');
  var id = setInterval (uploadStatus, 10);
  function uploadStatus() {
    if (width >= 100) {
      clearInterval(id);
      result = "success";
      uploadResult();
      showUploadAgain();
    } else {
      width++;
      elem.style.width = width + '%';
    }
  };
});

//checks the result of the file upload, if success user is taken to success screen,
//else user recieves failure message
function uploadResult() {
  if (result == 'success') {
    $('#upload-status').text('Success');
    $('#upload-info').html('Your file has been uploaded and saved to <span> your files </span>!');
    //allows user to click on "your files" text and redirect to my files screen
    $('span').click(function(e){
      $('#tab1').removeClass('active');
      $('.upload').removeClass('active');
      $('#tab2').addClass('active');
      $('.my-files').addClass('active');
      //resets new file counter after redirecting to my files screen
      resetNewFileCount();
    });
    $('.remove-button').hide();
    $('#upload-progress').attr('style', 'background-color:#c0ddaa; width: 100%');
    pushToMyFiles();
  } else {
    $('#upload-status').text('Upload failed, please try again');
  };
};

//sets a variable equal to the file to upload, once file is uploaded successfully
//the file is pushed to a new array, then loops through the length of the array
//and appends the value to a list element in the html, prints the length to alert user
//of new file uploaded
function pushToMyFiles() {
 var file = fileToUpload;
 uploadedFiles.push(file);
 uploadedFilesLength++;
 $.each(uploadedFiles, function(i, file){
   $('#uploaded-files').append('<li class="saved-files">' + file + '<button value="button" class="my-file-delete">X</button></li>');
 });
 $('#new-file-counter').text(uploadedFilesLength).show();
 //allows user to delete a record from "my files"
 $('.my-file-delete').click(function(e) {
   $(this).closest('li').remove();
 });
};

//on click calls a function to remove/cancel file upload
$('.remove-button').click(function(e){
  showSelectFile();
});

//resets workflow to allow for additional file to be uploaded
$('.upload-again').click(function(e){
  resetProgressBar();
  showSelectFile();
  hideUploadAgain();
});

// when clicking an element with the tab class, a variable is set to identify
// the element clicked
$('.tab').click(function(e){
  var tab = $(this).attr('data-tab');
  console.log(tab);
  //remove active class from tab and coresponding content
  $('.tab').removeClass('active');
  $('.content').removeClass('active');
  //add active class to selected element with tab class
  $(this).addClass('active');
  console.log($(this));
  //set corresponding content for tab to class active by prepending the
  //value of the tab variable with '.'
  $("." + tab).addClass('active');
  //hides and resets new uploaded file counter
  resetNewFileCount()
});

//hides and resets new uploaded file counter
function resetNewFileCount() {
  $('#new-file-counter').hide();
  uploadedFilesLength = '';
}

//display select file screen
function showSelectFile() {
  $('.upload-file').hide();
  $('.select-file').show();
};

//display upload selected file screen
function showUploadFile() {
  $('.select-file').hide();
  $('.upload-file').show();
  //makes delete button visable to remove selected file
  $('.remove-button').show();
};

//hides upload button and displays upload another file button
function showUploadAgain() {
  $('.upload-button').hide();
  $('.upload-again').show();
};

//hides upload another button
function hideUploadAgain() {
  $('.upload-again').hide();
  $('.upload-button').show();
  //$('#new-file-counter').hide();
};

//display loading text
function fileLoading() {
  $('#upload-status').text('Loading...');
  $('.upload-button').hide();
};

//resets progress bar to default for next time through the workflow
function resetProgressBar() {
  $('#upload-status').text('Please choose your file');
  $('#upload-info').text('');
  $('#upload-progress').attr('style', 'background-color:#84a6c7; width:1%');
};


});
