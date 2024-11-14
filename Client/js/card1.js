/*
Name        : Htoo Htet
Class       : DIT/1B/11
Admin no.   : 2334228
*/

const template = document.createElement('template');

template.innerHTML = `
    <style>
        :host {
            display : block;
            border-style: outset;
            font-family: Arial, Helvetica, sans-serif;
            background-color : lightgrey;
        }
        div {
            padding : 0px 30px 30px 30px;
        }
        h3 {
            font-size : 2rem;
        }
        h5 {
            font-size : 1rem;
        }
        button#detailsBtn { 
            border: none;
            outline:none;
            font-family: Arial, Helvetica, sans-serif;
            font-size : 1rem;
            background-color: orange;
            border-radius: 30%;
        }
        p#moreInfo {
            display: none;
        }
    </style>
    <div>
        <h3 id='flatType'></h3>
        <hr>
        <h5>Highest price: <span id='highestPrice'></span></h5>
        <h5>Lowest price: <span id='lowestPrice'></span></h5>
    </div>
`;

class highestLowestPricesCard extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes you need
    static get observedAttributes() {
        return ['flattype', 'highestprice', 'lowestprice'];
    }

    // link attributes to properties 
    get flattype() {
        return this.getAttribute('flattype');
    }
    set flattype(value) {
        this.setAttribute('flattype', value); 
    }

    get highestprice() {
        return this.getAttribute('highestprice');
    }
    set highestprice(value) {
        this.setAttribute('highestprice', value); 
    }

    get lowestprice() {
        return this.getAttribute('lowestprice');
    }
    set lowestprice(value) {
        this.setAttribute('lowestprice', value); 
    }

    // handle attribute updates
    attributeChangedCallback(attrName, oldValue, newValue ) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'flattype' :
                element = this.root.querySelector('#flatType')
                element.textContent = newValue;
            break;
            case 'highestprice' :
                element = this.root.querySelector('#highestPrice')
                element.textContent = newValue;
            break;
            case 'lowestprice' :
                element = this.root.querySelector('#lowestPrice')
                element.textContent = newValue;
            break;
        }
    }
}

window.customElements.define('card-hl', highestLowestPricesCard);