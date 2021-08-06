import React from "react";
import {Nav, Navbar} from "react-bootstrap";

export const NavsBar = () => {
    return (
        <div>
            <Navbar className='navStyle' >
                <Navbar.Brand className ='text-white pl-5' >Dataquest</Navbar.Brand>
                <Nav className="mr-auto" className='justify-content-end' style={{width:'100%'}}>
                {/* <Nav.Link className ='text-white pr-5' href="/">Home</Nav.Link> */}
                <Nav.Link className ='text-white pr-5' href="/competition">Competitions</Nav.Link>
                <Nav.Link className ='text-white pr-5' href="/leaderboadfinal" >Leaderboard</Nav.Link>
                <Nav.Link className ='text-white pr-5' href="/">Log out</Nav.Link>
                </Nav>
            </Navbar> 

        </div>
    );
};
