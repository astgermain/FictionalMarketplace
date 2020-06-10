import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFileAlt } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons'

class ContactButtons extends Component {

    componentDidMount = () => {
        setTimeout(function(){
            document.getElementById("preload1").className="linkedInButton";
            document.getElementById("preload2").className="githubButton";
            document.getElementById("preload3").className="emailContactButton";
            document.getElementById("preload4").className="resumeButton";
        },510);
    }

    render(){
        return(
            <div className="contactCenter">
                <div className="row">
                    <div className="col-6 colHoverEffectHelp">
                        <a href="https://www.linkedin.com/in/astger/" target="_blank" rel="noopener noreferrer" className="contactA">
                            <div className="linkedInButtonPre" id="preload1">
                                <FontAwesomeIcon icon={faLinkedin} className="linkedInIcon"/>
                                <span className="linkedInLabel">LinkedIn</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-6 colHoverEffectHelp">
                        <a href="https://github.com/astgermain" target="_blank" rel="noopener noreferrer" className="contactA">
                            <div className="githubButtonPre" id="preload2">
                                <FontAwesomeIcon icon={faGithubSquare} className="githubIcon"/>
                                <span className="githubLabel">GitHub</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 colHoverEffectHelp">
                        <a href="mailto:astgermain@mail.sfsu.edu" className="contactA">
                            <div className="emailContactButtonPre" id="preload3">
                                <FontAwesomeIcon icon={faEnvelope} className="emailContactIcon"/>
                                <span className="emailContactLabel">Email</span>
                            </div>
                        </a>
                    </div>
                    <div className="col-6 colHoverEffectHelp">
                        <a href="https://github.com/astgermain/andrewstgermainresume/blob/master/AndrewStGermainResume_10_4.pdf" target="_blank" rel="noopener noreferrer" className="contactA">   
                            <div className="resumeButtonPre" id="preload4">
                                <FontAwesomeIcon icon={faFileAlt} className="resumeIcon"/>
                                <span className="resumeLabel">Resume</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactButtons;