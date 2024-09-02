document.getElementById('fetchBtn').addEventListener('click', fetchData);

async function fetchData() {

    try{
        const res = await fetch('https://time.com'); // Data is in the form of object
        const txt = await res.text();
        
        // Parsing the HTML content to find the latest stories
        const parser = new DOMParser();
        const data = parser.parseFromString(txt, 'text/html');

        // Extracting the latest stories based on class or tag structure
        const stories = [];
        const elements = data.querySelectorAll('h2 a'); // Assume title as h2 and link as anchor tag
        for (let i = 0; i < Math.min(6, elements.length); i++) {
            const storyData = {
                title: elements[i].innerText,
                link: elements[i].innerHTML,
            };
            stories.push(storyData);
        }

        // Display the array of objects into JSON string
        document.getElementById('output').textContent = JSON.stringify(stories);
    }
    catch(e) {
        console.error('Error Fetching the stories', error)
    }
}