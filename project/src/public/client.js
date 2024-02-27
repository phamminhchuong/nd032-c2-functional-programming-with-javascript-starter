
let store = Immutable.Map({
    user: Immutable.Map({ name: "Visitor" }),
    dateQuery: Immutable.Map({
        'Curiosity': '2024-02-19',
        'Opportunity': '2018-06-11', 
        'Spirit' : '2010-03-21'
    }),
    roverSelected: '',
    apod: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = store.merge(newState)
    //console.log(store.get('roverSelected'))
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const changeRover = function(rover){
    updateStore(store, {apod:'', roverSelected:rover})
}

// create content
const App = (state) => {
    let rovers = state.get('rovers')
    return `
        <header></header>
        <main>
            ${Greeting(state.get('user').get('name'))}  
            <div class="container-button">
                <h2>Please select a rover to see amazing picture from Mars:</h2>
                <div class="select-rover">
                ${rovers.map(function(rover){
                    return `
                        <button class="button-rover" onclick="changeRover('${rover}')">${rover}</button>
                    `
                }).join(``)}
            </div>
            </div>
            ${state.get('roverSelected') ? `
            <section>
                ${ImageOfTheDay(state)}
            </section>
            `:
            ``}
            
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}


const ImageOfTheDay = (state) => {
    let apod = state.get('apod')
    if (!apod) {
        getImageOfTheDay(state)
    }
    if(apod == ''){
        return '<p style=\'color:white\'>Updating...</p>';
    }
    let data;
    const photos = apod.get('photos').toJS()
    if(photos != undefined && photos.length > 0){
        let randomIndex = Math.floor(Math.random() * photos.length);
        data = photos[randomIndex]
    }
    return (`
    <div class="content">
        <div class="img-content>">
            <img src="${data.img_src}"/>
        </div>
        <div class="des-content">
            <p>Landing date: ${data.rover.landing_date}</p>
            <p>Launch date: ${data.rover.launch_date}</p>
            <p>Status: ${data.rover.status}</p>
            <p>Total photos: ${data.rover.total_photos}</p>
            <p>Max date: ${data.rover.max_date}</p>
        </div>
    </div>
        `)
}

// ------------------------------------------------------  API CALLS

const getImageOfTheDay = (state) => {
    let dateQuery= state.get('dateQuery');
    let roverSelected = state.get('roverSelected');
    fetch(`http://localhost:3000/apod?rover=${roverSelected.toLowerCase()}&date=${dateQuery.get(roverSelected)}`)
        .then(res => res.json())
        .then(apod => {updateStore(state, { apod });})
}
