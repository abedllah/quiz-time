import React from 'react'

export default function MainPage() {
    return (
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-800 p-4 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold mb-8">QuizMaster</h1>
                    <nav>
                        <ul>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded bg-gray-700">
                                    <i className="fas fa-home mr-2"></i> Home
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                                    <i className="fas fa-file-alt mr-2"></i> Create Quiz
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                                    <i className="fas fa-trophy mr-2"></i> Leaderboard
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                                    <i className="fas fa-user mr-2"></i> My Profile
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                                <i className="fas fa-cog mr-2"></i> Settings
                            </a>
                        </li>
                        <li>
                            <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700">
                                <i className="fas fa-sign-out-alt mr-2"></i> Log Out
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="w-3/4 p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">Welcome to QuizMaster!</h2>
                        <p className="text-gray-400">Quiz Level: Advanced</p>
                    </div>
                    <img src="https://placehold.co/50x50" alt="User profile picture" className="rounded-full w-12 h-12"/>
                </header>
                <section className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Your Quiz Creations</h3>
                    <div className="flex items-center space-x-4">
                        <img src="https://placehold.co/50x50" alt="Quiz creation 1" className="rounded-full w-12 h-12"/>
                        <img src="https://placehold.co/50x50" alt="Quiz creation 2" className="rounded-full w-12 h-12"/>
                        <img src="https://placehold.co/50x50" alt="Quiz creation 3" className="rounded-full w-12 h-12"/>
                        <img src="https://placehold.co/50x50" alt="Quiz creation 4" className="rounded-full w-12 h-12"/>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">Play</button>
                    </div>
                </section>
                <section className="mb-8">
                    <div className="bg-gray-800 p-4 rounded mb-4 flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-bold">Quiz Time!</h4>
                            <p className="text-gray-400">Put your knowledge to the test with our</p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded">Start</button>
                    </div>
                    <div className="bg-gray-800 p-4 rounded flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-bold">Italian Cuisine</h4>
                            <p className="text-gray-400">Food Lover's Quiz</p>
                        </div>
                        <button className="bg-white text-black px-4 py-2 rounded">Begin Quiz</button>
                    </div>
                </section>
                <section>
                    <h3 className="text-xl font-bold mb-4">Quiz Activities</h3>
                    <div className="flex space-x-4">
                        <div className="flex flex-col items-center">
                            <i className="fas fa-book text-2xl mb-2"></i>
                            <span>Reading</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-headphones text-2xl mb-2"></i>
                            <span>Listening</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-spell-check text-2xl mb-2"></i>
                            <span>Grammar</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-certificate text-2xl mb-2"></i>
                            <span>Skill</span>
                        </div>
                    </div>
                </section>
            </main>
            <aside className="w-1/4 bg-gray-800 p-4">
                <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4">Join a Quiz</h3>
                    <p className="text-gray-400 mb-4">Test your knowledge with challenging questions!</p>
                    <button className="bg-white text-black px-4 py-2 rounded">Join</button>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">Quiz Leaderboard</h3>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded mb-4">View All</button>
                    <ul>
                        <li className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Top Scorer" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#01 Top Scorer</span>
                            </div>
                            <span>2398 points</span>
                        </li>
                        <li className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Quiz Master" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#02 Quiz Master</span>
                            </div>
                            <span>2019 points</span>
                        </li>
                        <li className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="Quiz" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#03 Quiz</span>
                            </div>
                            <span>1832 points</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img src="https://placehold.co/30x30" alt="You" className="rounded-full w-8 h-8 mr-2"/>
                                <span>#07 You</span>
                            </div>
                            <span>420 points</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
}
