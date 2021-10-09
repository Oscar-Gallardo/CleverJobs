document.querySelector('.button-wrapper').addEventListener('click', () => {
    let text = document.getElementById('filter-jobs').value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs);
    });
});

async function getJobs() {
    let response = await fetch('data.json');
    let data = await response.json();
    return data;
}

function filterJobs(jobs, searchText) {
    if(searchText) {
        let filteredJobs = jobs.filter(job => {
            if(job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
                return true;
            } else {
                return false;
            }
        });
        return filteredJobs;
    } else {
        return jobs;
    }
}

function showJobs(jobs) {
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