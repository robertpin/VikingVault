import React from 'react';
import white_logo from '../Resources/images/logo_wirtek_white.png'
import footer from "../Resources/images/footer_login_page.png"

function FooterForm(props: any){
    return <footer className={props.class}>
          <img className="footer-img" src={footer} alt="Footer Login" />
          <img className="white-logo" src={white_logo} alt="Wirtek White Logo" />
          <p className="description-text">
            Wirtek is a Denmark-based software development center with business operations in Cluj-Napoca and Bucharest,<br/>
            having strong competencies in software solutions development and telecom product testing <br/>
            requiring a high level of technical expertise in knowledge-intensive fields. </p>
        </footer>
}

export {FooterForm}