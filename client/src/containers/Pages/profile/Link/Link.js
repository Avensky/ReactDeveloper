import React from 'react';
import myClasses from './Link.module.scss';
// import classes from '../../Pages.module.scss'

const link = (props) => (
    <div className={[myClasses.Card, myClasses.Link].join(' ')}>

            <h3>
                <span className={["fa", props.icon, 'my-' + props.mystyle].join(' ')} />
                <span> {props.link}</span>
            </h3>
            <p>{props.email}      </p> <br />
            <p>{props.token}      </p> <br />
            <p>{props.name}       </p> <br />
            <p>{props.displayName}</p> <br />
            <p>{props.username}   </p> <br />
            <p>{props.password}   </p>
            <a href="/unlink/local" className="btn btn-default">Unlink</a>
            <a href="/connect/local" className={["btn", props.mystyle].join(' ')}>Connect {props.link}</a>
    
    </div>
)

export default link;