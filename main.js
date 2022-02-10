let url = 'http://www.boredapi.com/api/activity'
let data = null
let activity;
let type;
let participants;
let accessibility = {
    factor: '',
    color: ''
};
let price = {
    factor: '',
    color: ''
};

function convertToJson(response) {
    if (response.ok) {
      return response.json();
    } else {
      console.log("error:", response);
    }
}

function assignData(result) {
    data = result;
}

function processData() {
    activity = data.activity;
    type = data.type;
    participants = data.participants;
    // Accessibility
    if (data.accessibility < 0.3) {
        accessibility.factor = 'Easy';
        accessibility.color = '#13b91b';
    } else if (data.accessibility >= 0.3 && data.accessibility <= 0.6) {
        accessibility.factor = 'Medium';
        accessibility.color = '#F1D302';
    } else if (data.accessibility > 0.6){
        accessibility.factor = 'Hard';
        accessibility.color = '#C1292E';
    }
    // Price
    if (data.price === 0) {
        price.factor = 'Free';
        price.color = '#13b91b';
    } else if (data.price < 0.33) {
        price.factor = 'Cheap';
        price.color = '#13b91b';
    } else if (data.price > 0.33 && data.price < 0.66) {
        price.factor = 'Normal';
        price.color = '#F1D302';
    } else {
        price.factor = 'Expensive';
        price.color = '#C1292E';
    }
}

function embedData() {
    document.querySelector('.activity').textContent = activity;
    document.querySelector('.type').textContent = type;
    document.querySelector('.participants').textContent = participants;
    document.querySelector('.accessibility').textContent = accessibility.factor;
    document.querySelector('.accessibility').style.color = accessibility.color;
    document.querySelector('.price').textContent = price.factor;
    document.querySelector('.price').style.color = price.color;
}

function reloadBtn() {
    document.querySelector('.activity').textContent = 'Loading...';
    document.querySelector('.type').textContent = '';
    document.querySelector('.participants').textContent = '';
    document.querySelector('.accessibility').textContent = '';
    document.querySelector('.price').textContent = '';

    // Check for each type
    type = document.querySelector('.select-types select').value;
    if (type == 'education' || type == 'recreational' || type == 'social' || type == 'diy' || type == 'charity' || type == 'cooking' || type == 'relaxation' || type == 'music' || type == 'busywork') {
        url = `http://www.boredapi.com/api/activity?type=${type}`
    }

    // Fetch
    fetch(url).then(convertToJson).then(assignData).then(processData).then(embedData);
}

fetch(url).then(convertToJson).then(assignData).then(processData).then(embedData);

// {
//     "activity": "Go to a concert with some friends",
//     "type": "social",
//     "participants": 4,
//     "price": 0.6,
//     "link": "",
//     "key": "4558850",
//     "accessibility": 0.4
//   }