import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <nav className="bg-magenta-800 p-4">
            <div className="flex justify-center">
                <div className="flex space-x-8">
                    <Link style={{ fontSize: '20px' , padding: "5px", border:"  2px solid #646cff", margin: "3px"}} to="/orders">
                        Order
                    </Link>
                    <Link style={{ fontSize: '20px' , padding: "5px", border:"  2px solid #646cff", margin: "3px"}}to="/rservasion">
                        Rservasion
                    </Link>
                    <Link style={{ fontSize: '20px' , padding: "5px", border:"  2px solid #646cff", margin: "3px"}} to="/online">
                        Online
                    </Link>
                    <Link style={{ fontSize: '20px' , padding: "5px", border:"  2px solid #646cff", margin: "3px"}} to="/catering">
                        catering
                    </Link>



                </div>
            </div>
        </nav>
    );
};

export default Home;