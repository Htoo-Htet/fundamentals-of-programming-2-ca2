/*
Name        : Htoo Htet
Class       : DIT/1B/11
Admin no.   : 2334228
*/

const template0 = document.createElement('template');

template0.innerHTML = `
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
        <h5>Mean price: <span id='meanPrice'></span></h5>
        <h5>Median price: <span id='medianPrice'></span></h5>
    </div>
`;

class meanMedianPricesCard extends HTMLElement {
    constructor () {
        super();
        this.root = this.attachShadow({mode: 'closed'});
        
        let clone = template0.content.cloneNode(true);
        this.root.append(clone);
    }

    // define attributes you need
    static get observedAttributes() {
        return ['flattype', 'meanprice', 'medianprice'];
    }

    // link attributes to properties 
    get flattype() {
        return this.getAttribute('flattype');
    }
    set flattype(value) {
        this.setAttribute('flattype', value); 
    }

    get meanprice() {
        return this.getAttribute('meanprice');
    }
    set meanprice(value) {
        this.setAttribute('meanprice', value); 
    }

    get medianprice() {
        return this.getAttribute('medianprice');
    }
    set medianprice(value) {
        this.setAttribute('medianprice', value); 
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
            case 'meanprice' :
                element = this.root.querySelector('#meanPrice')
                element.textContent = newValue;
            break;
            case 'medianprice' :
                element = this.root.querySelector('#medianPrice')
                element.textContent = newValue;
            break;
        }
    }
}

window.customElements.define('card-mm', meanMedianPricesCard);