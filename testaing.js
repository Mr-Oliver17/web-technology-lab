const users_list = document.getElementById('users_list'); // linking user_list from the html file to js file 
const user_detail = document.getElementById('user_detail'); // linking user_detail from the html file to js file
const user_login = document.getElementById('user_login');
const user_name = document.getElementById('user_name');
const user_avatar = document.getElementById('user_avatar_url');
const user_github = document.getElementById('user_github_html_url');
const search_bar = document.getElementById('search_bar');
const search_button = document.getElementById('search_button');
const error_message = document.getElementById('error_message');


// base url for github api
const api = 'https://api.github.com/users';

// display none
user_detail.style.display = "none"

// search the user based in the input in search bar
function searchUser() {
    const userName = search_bar.value;
    if (userName.trim() !== '') {
        axios.get(`${api}/${userName}`)
            .then(response => {
                const user = response.data;
                user_detail.style.display = 'block';
                user_login.textContent = user.login;
                user_name.textContent = user.name;
                user_avatar.src = user.avatar_url;
                user_avatar.alt = user.name;
                user_github.href = user.html_url;
                user_github.textContent = user.html_url;
                error_message.style.display = 'none';
            })
            .catch(function (error) {
                console.log("Error while fetching.\n", error);
                error_message.innerHTML = "Error While Fetching";
            })
    }
    else {
        user_detail.style.display = 'none';
        error_message.innerHTML = "Please enter a valid username";
    }
}

search_button.addEventListener('click', searchUser)

search_bar.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault()
        search()
    }
})