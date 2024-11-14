/*
Name        : Htoo Htet
Class       : DIT/1B/11
Admin no.   : 2334228
*/

function mean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
  }
  
function median(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedNumbers.length / 2);

    if (sortedNumbers.length % 2 === 0) {
        const median = (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
        return median;
    } else {
        return (sortedNumbers[middleIndex]).toFixed(2);
    }
}

let allHdbData = [];
let townNames = [];

function loadAllHdbData() {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/allhdbdata')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => console.log("Error: ", error));
    });
}

async function getAllHdbData() {
    try {
        allHdbData = await loadAllHdbData();
        return allHdbData;
    } catch (error) {
        console.log(error);
    }
}

async function selectableTowns() {
    try {
        const data = await getAllHdbData();
        const uniqueTowns = [...new Set(data.map(hdb => hdb.town))];
        for(const town of uniqueTowns) {
            townNames.push(town);
        }

        const selectTown = document.getElementById('selectTown');
        townNames.forEach(town => {
            const option = document.createElement('option');
            option.value = town;
            option.textContent = town;
            selectTown.appendChild(option);
        });
    } catch (error) {
        console.error('Error: ', error);
    }
}

selectableTowns()
.then(() => {
    const submit = document.getElementById('townSelected');
    submit.addEventListener('click', () => {
        let flatTypes = [];

        const selectedTown = document.getElementById(`selectTown`).value;
        console.log(`Selected Town: ${selectedTown}`);
    
        async function getAllHdbDataByTown (town) {
            try {
                const encodedTown = encodeURIComponent(town);
                const response = await fetch(`http://localhost:8081/bytown/${encodedTown}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error: ', error);
            }
        }

        async function displayAllFlatTypes () {
            try {
                const data = await getAllHdbDataByTown(selectedTown)
                uniqueFlatTypes = [...new Set(data.map(hdb => hdb.flat_type))];
                uniqueFlatTypes.sort();
                for(const type of uniqueFlatTypes) {
                    flatTypes.push(type);
                }
                
                highestLowest(data);
                meanMedian(data);
            } catch (error) {
                console.error('Error:', error)
            }
        }
        
        displayAllFlatTypes()
      
        const highestLowest = (data) => {
            const highestLowestPricesList = document.getElementById('highestLowestPricesList')
            highestLowestPricesList.innerHTML = `<h3>Highest and lowest price HDB in <br>${selectedTown}</h3>`
            
            flatTypes.forEach(type => {
                const hdbByFlatType = data.filter(hdb => hdb.flat_type === type);
                const sortByPrice = hdbByFlatType.slice().sort((a, b) => a.resale_price - b.resale_price);
            
                const highestPrice = sortByPrice[sortByPrice.length - 1].resale_price;
                const lowestPrice = sortByPrice[0].resale_price;

                const highestLowestPriceCard = document.createElement('card-hl')
                highestLowestPriceCard.setAttribute('flattype', type);
                highestLowestPriceCard.setAttribute('highestprice', highestPrice);
                highestLowestPriceCard.setAttribute('lowestprice', lowestPrice);
                highestLowestPricesList.appendChild(highestLowestPriceCard)
                
            })
            
        }
    
        const meanMedian = (data) => {
            const meanMedianPricesList = document.getElementById('meanMedianPricesList')
            meanMedianPricesList.innerHTML = `<h3>Mean and median HDB price in <br>${selectedTown}</h3>`
    
            flatTypes.forEach(type => {
                const hdbByFlatType = data.filter(hdb => hdb.flat_type === type); 
                const priceList = hdbByFlatType.map(hdb => hdb.resale_price);

                const meanPrice = mean(priceList);
                const medianPrice = median(priceList);    
                
                const meanMedianPriceCard = document.createElement("card-mm");
                meanMedianPriceCard.setAttribute('flattype', type)
                meanMedianPriceCard.setAttribute('meanprice', meanPrice)
                meanMedianPriceCard.setAttribute('medianprice', medianPrice)
                meanMedianPricesList.appendChild(meanMedianPriceCard)
            })
        }
    });
})