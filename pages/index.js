import Link from "next/link";

export default function Index() {
    return (
        <div>
            <p>Drake University Apparel</p>
            <Link href="/items">
                <a>View Apparel!</a>
            </Link>
        </div>
    );
}