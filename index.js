var players = [
    {
        stats: {
            roaches: 0,
            rats: 0,
            elite: 0,
            centipedes: 0,
            spiders: 0
        },
        abilities: [
            {
                name: 'Give Order',
                value: 0
            }
        ]
    },
    {
        stats: {
            roaches: 0,
            rats: 0,
            elite: 0,
            centipedes: 0,
            spiders: 0
        },
        abilities: [
            {
                name: 'Energy Rush',
                value: 0
            },
            {
                name: 'Find',
                value: 0
            }
        ]
    }
]
loadPlayerStats()

function loadPlayerStats() {
    xmh = new XMLHttpRequest()
    xmh.open('GET', 'https://jsonblob.com/api/1186081479855038464', false)
    xmh.setRequestHeader('content-type', 'application/json')
    xmh.onload = function () {
        players = JSON.parse(xmh.responseText).players
        renderStats()
    }
    xmh.send()
}

function renderStats() {
    for (i = 0; i < 6; i++) {
        stats = players[i].stats
        card = document.querySelector('#main').children[i]
        card.querySelector('.roaches').innerHTML = stats.roaches
        card.querySelector('.rats').innerHTML = stats.rats
        card.querySelector('.elite').innerHTML = stats.elite
        card.querySelector('.centipedes').innerHTML = stats.centipedes
        card.querySelector('.spiders').innerHTML = stats.spiders

        abilities = players[i].abilities
        cardAbilities = card.querySelector('.abilities')
        cardAbilities.innerHTML = ''
        for (n=0;n<abilities.length;n++) {
            abilityName = document.createElement('span')
            abilityName.innerHTML = abilities[n].name
            abilityName.classList = 'name'
            cardAbilities.appendChild(abilityName)
            abilityValue = document.createElement('span')
            abilityValue.innerHTML = abilities[n].value
            abilityValue.classList = 'value'
            cardAbilities.appendChild(abilityValue)
            abilityValue.contentEditable = true
        }
    }
}

function updatePlayerStats() {
    for (i=0;i<6;i++) {
        newPlayerData = {}
        newPlayerData.stats = {}
        newPlayerData.abilities = []
        card = document.querySelector('#main').children[i]
        newPlayerData.stats.roaches = card.querySelector('.roaches').innerHTML
        newPlayerData.stats.rats = card.querySelector('.rats').innerHTML
        newPlayerData.stats.elite = card.querySelector('.elite').innerHTML
        newPlayerData.stats.centipedes = card.querySelector('.centipedes').innerHTML
        newPlayerData.stats.spiders = card.querySelector('.spiders').innerHTML

        cardAbilities = card.querySelector('.abilities').children
        for (n=0;n<cardAbilities.length;n=n+2) {
            ability = {}
            ability.name = cardAbilities[n].innerHTML
            ability.value = cardAbilities[n+1].innerHTML
            newPlayerData.abilities.push(ability)
            console.log('added ability',ability)
        }
        players[i] = newPlayerData
    }

    xmh = new XMLHttpRequest()
    xmh.open('PUT', 'https://jsonblob.com/api/1186081479855038464', false)
    xmh.setRequestHeader('content-type','application/json')
    xmh.onload = function () {
        console.log('updated server')
    }
    xmh.send(`{"players":${JSON.stringify(players)}}`)
}

function addAbility(ele) {
    abilitiesWrapper = ele.parentElement.querySelector('.abilities')
    abilityName = prompt('Ability Name:')
    if (abilityName) {
        nameEle = document.createElement('span')
        nameEle.innerHTML = abilityName
        nameEle.classList = 'name'

        valueEle = document.createElement('span')
        valueEle.innerHTML = 0
        valueEle.classList = 'value'

        abilitiesWrapper.appendChild(nameEle)
        abilitiesWrapper.appendChild(valueEle)
        valueEle.contentEditable = true
    }
}

function increment(ele) {
    index = Array.prototype.indexOf.call(ele.parentElement.children, ele)
    ele.parentElement.children[index-1].innerHTML = Number(ele.parentElement.children[index-1].innerHTML)+1
}

setInterval(function(){
    console.log('autosaving...')
    updatePlayerStats()
},60000)
