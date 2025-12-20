export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <a href="/privacy-policy">
                    <p>privacy policy</p>
                    </a>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Alive Paris. All rights reserved.
                </p>    
            </div>
        </footer>
    );
}