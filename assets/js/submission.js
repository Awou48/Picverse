document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('artwork');
    const fileName = document.querySelector('.file-name');
    const fileSize = document.querySelector('.file-size');
    const filePreview = document.querySelector('.file-preview');
    const submitBtn = document.querySelector('.submit-btn');

    // Tambahkan loading state ke tombol submit
    submitBtn.addEventListener('click', function(e) {
        if (validateForm(e)) {
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showSuccessMessage();
                resetForm();
                submitBtn.innerHTML = 'Submit Artwork';
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <h3>Submission Successful!</h3>
                <p>Your artwork has been submitted successfully.</p>
                <p>We will review your submission and get back to you soon.</p>
            </div>
        `;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.classList.add('fade-out');
            setTimeout(() => {
                successMessage.remove();
            }, 500);
        }, 3000);
    }

    function resetForm() {
        document.getElementById('submissionForm').reset();
        document.querySelector('.file-preview').style.display = 'none';
        document.querySelector('.file-preview').innerHTML = '';
        document.querySelector('.file-name').textContent = 'No file chosen';
        document.querySelector('.file-size').textContent = '';
    }

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            fileName.textContent = file.name;
            fileSize.textContent = formatFileSize(file.size);

            if (!file.type.startsWith('image/')) {
                showError('artworkError', 'Please upload an image file');
                resetFileInput();
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                showError('artworkError', 'File size should be less than 5MB');
                resetFileInput();
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                filePreview.style.display = 'block';
                filePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        } else {
            resetFileInput();
        }
    });

    function resetFileInput() {
        fileInput.value = '';
        fileName.textContent = 'No file chosen';
        fileSize.textContent = '';
        filePreview.style.display = 'none';
        filePreview.innerHTML = '';
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
});

function validateForm(event) {
    event.preventDefault();
    
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    const email = document.getElementById('email').value.trim();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const tags = document.getElementById('tags').value.trim();
    const original = document.querySelector('input[name="original"]:checked');
    const artwork = document.getElementById('artwork').files[0];

    let isValid = true;

    if (!email) {
        showError('emailError', 'Email is required');
        isValid = false;
    } else if (!email.includes('@')) {
        showError('emailError', 'Email must contain @ symbol');
        isValid = false;
    }

    if (!title) {
        showError('titleError', 'Title is required');
        isValid = false;
    }

    if (!description) {
        showError('descriptionError', 'Description is required');
        isValid = false;
    }

    if (!tags) {
        showError('tagsError', 'Tags are required');
        isValid = false;
    } else {
        const tagArray = tags.split(' ');
        if (tagArray.length > 1) {
            showError('tagsError', 'Tags must be a single word');
            isValid = false;
        } else if (!tags.startsWith('#')) {
            showError('tagsError', 'Tags must start with #');
            isValid = false;
        }
    }

    if (!original) {
        showError('originalError', 'Please select if this is your original artwork');
        isValid = false;
    }

    if (!artwork) {
        showError('artworkError', 'Please upload your artwork');
        isValid = false;
    }

    if (isValid) {
        alert('Form submitted successfully!');
        document.getElementById('submissionForm').reset();
        document.querySelector('.file-preview').style.display = 'none';
        document.querySelector('.file-preview').innerHTML = '';
        document.querySelector('.file-name').textContent = 'No file chosen';
        document.querySelector('.file-size').textContent = '';
    }

    return false;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}
