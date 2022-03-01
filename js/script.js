/**
 * Portfolio Website
 * @author Onur Toycu
 */


/*############################*/
/*      JS Settings           */
/*############################*/
 "use strict";


/*############################*/
/*      Document Loaded       */
/*############################*/
document.addEventListener('DOMContentLoaded', function(event) {
    createStarsBackground();
    animateNavigation();
    animateContent();
});


/*############################*/
/*      Navigation Animations */
/*############################*/
function animateNavigation() {
    //Dropdown Elements
    const navDropdownElem = document.getElementById('nav-dropdown');
    const navDropdownOpenElem = document.getElementById('nav-dropdown-open');
    const navDropdownCloseElem = document.getElementById('nav-dropdown-close');
    const sharedClasses = ['animate__animated', 'animate__faster'];

    //Open Dropdown on icon click
    navDropdownOpenElem.addEventListener('click', function () {
        navDropdownElem.classList.remove('animate__slideOutUp');
        navDropdownElem.classList.add(...sharedClasses, 'animate__slideInDown');
        navDropdownElem.classList.remove('hidden');
        navDropdownOpenElem.classList.add('hidden');
        navDropdownCloseElem.classList.remove('hidden');
    });

    //Close Dropdown on icon or dropdown link click
    const closeDropdownAnimation = () => {
        navDropdownElem.classList.remove('animate__slideInDown');
        navDropdownElem.classList.add(...sharedClasses, 'animate__slideOutUp');
        navDropdownOpenElem.classList.remove('hidden');
        navDropdownCloseElem.classList.add('hidden');
    };
    navDropdownCloseElem.addEventListener('click', closeDropdownAnimation);
    navDropdownElem.addEventListener('click', closeDropdownAnimation);
}


/*############################*/
/*      Content Animations    */
/*############################*/
function animateContent() {
    const welcomeElem = document.getElementById('welcome-box');
    const headlineElems = document.getElementsByTagName('h1');
    const skillWrpElems = document.getElementsByClassName('skill-wrp');
    const projectsWrpElems = document.getElementsByClassName('projects-wrp');
    //const refWrpElems = document.getElementsByClassName('ref-wrp');
    const resumeWrpElems = document.getElementsByClassName('resume-wrp');
    const contactWrpElems = document.getElementsByClassName('contact-wrp');

    const sharedClasses = ['animate__animated', 'animate__slow'];
    const eleInfos = [
        {
            domObjs: [welcomeElem],
            animationClasses: [...sharedClasses, 'animate__jackInTheBox'],
        },
        {
            domObjs: skillWrpElems,
            animationClasses: [...sharedClasses, 'animate__fadeInLeft'],
        },
        {
            domObjs: projectsWrpElems,
            animationClasses: [...sharedClasses, 'animate__flipInX'],
        },
        /*{
            domObjs: refWrpElems,
            animationClasses: [...sharedClasses, 'animate__flipInX'],
        },*/
        {
            domObjs: resumeWrpElems,
            animationClasses: [...sharedClasses, 'animate__bounceIn'],
        },
        {
            domObjs: contactWrpElems,
            animationClasses: [...sharedClasses, 'animate__flipInX'],
        },
    ];

    const linkEleInfos = [
        {
            link: document.getElementById('link-skills'),
            wrp: document.getElementById('skills').getElementsByTagName('h1')[0],
        },
        {
            link: document.getElementById('link-projects'),
            wrp: document.getElementById('projects').getElementsByTagName('h1')[0],
        },
        /*{
            link: document.getElementById('link-refs'),
            wrp: document.getElementById('refs').getElementsByTagName('h1')[0],
        },*/
        {
            link: document.getElementById('link-resume'),
            wrp: document.getElementById('resume').getElementsByTagName('h1')[0],
        },
        {
            link: document.getElementById('link-contact'),
            wrp: document.getElementById('contact').getElementsByTagName('h1')[0],
        }
    ];

    //Statically animate welcome box and headlines
    welcomeElem.classList.add(...sharedClasses, 'animate__jackInTheBox');
    for (let headlineElem of headlineElems) {
        headlineElem.classList.add(...sharedClasses, 'animate__pulse', 'animate__infinite');
    }

    //Dynamically animate elements.
    //Check every Xms for a Scroll Event.
    let waiting = false;
    document.addEventListener('scroll', function(event) {
        if (waiting) return;
        else waiting = true;

        //Check for content elements that are visible and change animation classes.
        const windowOffSetTop = window.innerHeight + window.scrollY;
        for (let elementInfo of eleInfos) {
            for (let domObj of elementInfo.domObjs) {
                if (windowOffSetTop >= domObj.offsetTop 
                    && window.scrollY <= domObj.offsetTop + domObj.clientHeight) {
                    domObj.classList.add(...elementInfo.animationClasses);
                } else domObj.classList.remove(...elementInfo.animationClasses);
            }
        }

        //Search for headline elements that are visible and change navigation link classes.
        let activeFound = false;
        for (let linkEleInfo of linkEleInfos) {
            if (activeFound === false
                & linkEleInfo.wrp.offsetTop <= windowOffSetTop 
                & (linkEleInfo.wrp.offsetHeight + linkEleInfo.wrp.offsetTop) > window.scrollY) {
                linkEleInfo.link.classList.add('active');
                linkEleInfo.link.classList.remove('inactive');
                activeFound = true;
            } else {
                linkEleInfo.link.classList.remove('active');
                linkEleInfo.link.classList.add('inactive');
            }
        }
    
        setTimeout(function () {waiting = false}, 50);
    });
}


/*############################*/
/*      Stars Background      */
/*############################*/
function createStarsBackground() {
    const stars1 = Star.createStars(Math.round(document.body.clientWidth / 10));
    const stars2 = Star.createStars(Math.round(document.body.clientWidth / 20));
    const stars3 = Star.createStars(Math.round(document.body.clientWidth / 40));
    const stars1Css = Star.createCssString(stars1);
    const stars2Css = Star.createCssString(stars2);
    const stars3Css = Star.createCssString(stars3);
    document.getElementById('stars1A').style.boxShadow = stars1Css;
    document.getElementById('stars1B').style.boxShadow = stars1Css;
    document.getElementById('stars2A').style.boxShadow = stars2Css;
    document.getElementById('stars2B').style.boxShadow = stars2Css;
    document.getElementById('stars3A').style.boxShadow = stars3Css;
    document.getElementById('stars3B').style.boxShadow = stars3Css;
}

/**
 * Class holding a random position and a factory to create multiple positions.
 */
class Star {
    constructor() {
        this.x = this.calcRandomNumber(0, document.body.clientWidth);
        this.y = this.calcRandomNumber(0, window.innerHeight - 10);
    }

    /**
     * Calculates a random number between min and max.
     * @param {number} min Smallest possible number.
     * @param {number} max Biggest possible number.
     * @returns {number} Random number.
     */
    calcRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    /**
     * Factory Method
     * @param {number} amount Amount of instanzes to create.
     * @returns {Array.starPosition}
     */
    static createStars(amount) {
        let stars = [];

        for (let i = 0; i < amount; i++) {
            stars.push(new Star());
        }
    
        return stars;
    }

    /**
     * Creates a CSS attribute String from the given Objects Positions.
     * @param {Array.starPosition} stars
     * @returns {string} CSS attribute string.
     */
    static createCssString(stars) {
        let cssString = '';

        let rounds = stars.length;
        for (let i = 0; i < rounds; i++) {
            cssString += `${stars[i].x}px ${stars[i].y}px #FFF`;
            if (i + 1 < rounds) cssString += ', ';
        }

        return cssString;
    }
}


/*############################*/
/*      Contact Form Submit   */
/*############################*/
/**
 * Creates a HTTP POST request to a backend PHP Script.
 * Updates the DOM with a success or warning message box.
 * @returns {undefined}
 */
function submitContactForm() {
    let form = document.forms['contact'];
    let elements = form.elements;
    let name = elements.name.value;
    let email = elements.email.value;
    let message = elements.message.value;
    
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let responseArr = JSON.parse(this.responseText);
                let contactMsgBox = document.getElementById('contact-message');
                if (responseArr.success === true) form.reset();

                contactMsgBox.innerHTML = '';
                responseArr.messages.warning.forEach(message => contactMsgBox.insertAdjacentHTML('beforeend', message));
                responseArr.messages.success.forEach(message => contactMsgBox.insertAdjacentHTML('beforeend', message));
                
                const messageElems = document.getElementsByClassName('message');
                for (let messageElem of messageElems) {
                    messageElem.classList.add('animate__animated', 'animate__slow', 'animate__bounceIn');
                }
            }
        };
        xhttp.open("POST", "mail.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("name=" + name + "&email=" + email + "&message=" + message);
    } catch {
        document.getElementById('contact-message').innerHTML = 
        '<div class="message warning">Es gibt momentan ein serverseitiges Problem. Bitte benutzen sie eine alternative Kontaktmöglichkeit.</div>';
    }
}