document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('usernameInput').value;
    getUserInfo(username);
});

function getUserInfo(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Not Found') {
                alert('User not found!');
                return;
            }
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('username').textContent = data.login;
            document.getElementById('name').textContent = data.name || 'No name provided';
            document.getElementById('publicRepos').textContent = data.public_repos;
            document.getElementById('publicGists').textContent = data.public_gists;
            document.getElementById('createdAt').textContent = new Date(data.created_at).toISOString().split('T')[0];
            document.getElementById('userCard').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Failed to fetch user data');
        });
}
