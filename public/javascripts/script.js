var myWidget = cloudinary.createUploadWidget({
  cloudName: 'dmq7v9kox',
  uploadPreset: 'mic8wuvg'
}, (error, result) => {
  if (!error && result && result.event === "success") {
    fetch('/upload-profile-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ img: result.info.url })
    });
    location.reload();
  }
});


document.getElementById("upload_widget").addEventListener("click", function(){
    myWidget.open();
  }, false);



  const selectElement = document.getElementById('gender');
  
const defaultOptionValue = 'option2'; // Set the default option value here

for (let option of selectElement.options) {
  if (option.value === defaultOptionValue) {
    option.selected = true;
    break;
  }
}