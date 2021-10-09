document.querySelector('.button-wrapper').addEventListener('click', () => {
    let text = document.getElementById('filter-jobs').value;
    console.log(text);
});

function getJobs() {
    return fetch('data.json')
    .then(response => response.json())
    .then(data => {
        return data;
    })
}

function showJobs(jobs) {
    console.log('Jobs in showJobs', jobs);
    let jobsContainer = document.querySelector('.jobs-wrapper');
    let jobsHTML = '';
    jobs.forEach(job => {
        jobsHTML += `
            <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}"/>
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="role">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <button class="button apply-now">
                        Apply Now
                    </button>
                    <button class="button">
                        Message
                    </button>
                </div>
            </div>
        `;
    });
    jobsContainer.innerHTML = jobsHTML;
}

getJobs().then(data => {
    showJobs(data);
});