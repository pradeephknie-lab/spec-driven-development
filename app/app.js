const statusMessage = document.getElementById('statusMessage');
const employeeList = document.getElementById('employeeList');
const totalResults = document.getElementById('totalResults');
const jobTitleChip = document.getElementById('jobTitleChip');
const generatedAt = document.getElementById('generatedAt');
const reloadButton = document.getElementById('reloadButton');

function setStatus(message) {
  statusMessage.textContent = message;
}

function renderEmployees(employees) {
  employeeList.innerHTML = '';

  if (!employees.length) {
    employeeList.innerHTML = '<p class="status-message">No HR Manager entries found in the current artifact.</p>';
    return;
  }

  employees.forEach((employee, index) => {
    const card = document.createElement('article');
    card.className = 'employee-card';
    card.style.animationDelay = `${index * 60}ms`;
    card.innerHTML = `
      <h3>${employee.name}</h3>
      <p><strong>Job Title:</strong> ${employee.jobTitle}</p>
      <p><strong>Sub Unit:</strong> ${employee.subUnit}</p>
      <p><strong>Location:</strong> ${employee.location}</p>
    `;
    employeeList.appendChild(card);
  });
}

async function loadReport() {
  setStatus('Loading artifact...');

  try {
    const response = await fetch('/artifacts/hr-managers.json', { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Report artifact not found. Run the BDD suite to generate artifacts/hr-managers.json.');
    }

    const report = await response.json();
    totalResults.textContent = String(report.totalResults ?? 0);
    jobTitleChip.textContent = report.searchedJobTitle || 'Unknown job title';
    generatedAt.textContent = report.generatedAt
      ? new Date(report.generatedAt).toLocaleString()
      : 'Unknown timestamp';
    renderEmployees(report.employees || []);
    setStatus(`Loaded ${report.totalResults ?? 0} result(s).`);
  } catch (error) {
    totalResults.textContent = '0';
    jobTitleChip.textContent = 'No artifact loaded';
    generatedAt.textContent = 'Run the tests to generate data';
    employeeList.innerHTML = '';
    setStatus(error.message);
  }
}

reloadButton.addEventListener('click', () => {
  void loadReport();
});

void loadReport();
