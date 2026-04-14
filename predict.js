let model = null;

fetch("model.json")
    .then(res => res.json())
    .then(data => {
        model = data;
        console.log("Model loaded");
    });

function predict() {
    if (!model) {
        alert("Modell lädt noch!");
        return;
    }

    let inputVector = new Array(model.feature_names.length).fill(0);

    let job = document.getElementById("job_title").value;
    let exp = parseFloat(document.getElementById("experience").value);
    let edu = document.getElementById("education").value;
    let skills = parseFloat(document.getElementById("skills").value);
    let industry = document.getElementById("industry").value;
    let company = document.getElementById("company").value;
    let location = document.getElementById("location").value;
    let remote = document.getElementById("remote").value;
    let certs = parseFloat(document.getElementById("certs").value);

    setFeature(inputVector, "experience_years", exp);
    setFeature(inputVector, "skills_count", skills);
    setFeature(inputVector, "certifications", certs);

    setFeature(inputVector, "job_title_" + job, 1);
    setFeature(inputVector, "education_level_" + edu, 1);
    setFeature(inputVector, "industry_" + industry, 1);
    setFeature(inputVector, "company_size_" + company, 1);
    setFeature(inputVector, "location_" + location, 1);
    setFeature(inputVector, "remote_work_" + remote, 1);

    for (let i = 0; i < inputVector.length; i++) {
        inputVector[i] = (inputVector[i] - model.scaler_mean[i]) / model.scaler_scale[i];
    }

    let result = model.intercept;

    for (let i = 0; i < inputVector.length; i++) {
        result += inputVector[i] * model.coef[i];
    }

    document.getElementById("result").innerText = "Predicted Salary: " + result.toFixed(2);
}

function setFeature(vector, name, value) {
    let index = model.feature_names.indexOf(name);
    if (index !== -1) {
        vector[index] = value;
    }
}