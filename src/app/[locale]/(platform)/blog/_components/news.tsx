import React from "react";

function NewPost() {
    return (
        <section className="w-11/12 mx-auto rtl mt-7">
            <h2 className="text-right text-2xl mb-6 font-bold">جدیدترین ها</h2>
            <div className="space-y-8">
                {/* Post 1 */}
                <div className="flex border-b pb-5 gap-4">
                    <img src="/assets/blog/header.jpg" alt="" className="w-36 h-36 object-cover rounded-md" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Subscribe to the Medium Newsletter: Get motivated, stay informed, learn something new</h3>
                        <p className="text-sm text-gray-600 mb-3">Discover great Medium stories with our new newsletter</p>
                        <div className="flex items-center gap-3">
                            <img src="/assets/blog/testi2.jpg" alt="Author" className="w-10 h-10 rounded-full" />
                            <div className="text-xs">
                                <p>Harris Sockel</p>
                                <p className="text-gray-500">Sep 11 · 5 min read</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post 2 */}
                <div className="flex border-b pb-5 gap-4">
                    <img src="/assets/blog/sinava.jpg" alt="Medium Day" className="w-36 h-36 object-cover rounded-md" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Plan Your Medium Day Lineup 2024</h3>
                        <p className="text-sm text-gray-600 mb-3">Medium Day is this Saturday, August 17!</p>
                        <div className="flex items-center gap-3">
                            <img src="/assets/blog/testi2.jpg" alt="Author" className="w-10 h-10 rounded-full" />
                            <div className="text-xs">
                                <p>Brittany Jezouit</p>
                                <p className="text-gray-500">Aug 12 · 7 min read</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Post 3 */}
                <div className="flex border-b pb-5 gap-4">
                    <img src="/assets/blog/ocean.jpg" alt="Medium July Roundup" className="w-36 h-36 object-cover rounded-md" />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">It happened on Medium: July 2024 roundup</h3>
                        <p className="text-sm text-gray-600 mb-3">A big announcement, most-shared stories, and commentary on current events</p>
                        <div className="flex items-center gap-3">
                            <img src="/assets/blog/testi3.jpg" alt="Author" className="w-10 h-10 rounded-full" />
                            <div className="text-xs">
                                <p>Medium Staff</p>
                                <p className="text-gray-500">Aug 7 · 6 min read</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewPost;
