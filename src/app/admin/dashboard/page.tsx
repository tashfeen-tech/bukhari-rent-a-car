"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import {
    Car,
    LayoutDashboard,
    CalendarCheck,
    Users,
    LogOut,
    Clock,
    CheckCircle,
    XCircle,
    TrendingUp
} from "lucide-react";
import styles from "./Dashboard.module.css";

interface Booking {
    id: string;
    name: string;
    email: string;
    phone: string;
    carName: string;
    pickupDate: string;
    returnDate: string;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: any;
    withDriver: boolean;
}

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push("/admin/login");
            }
        });

        return () => unsubscribeAuth();
    }, [router]);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const bookingData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Booking[];
            setBookings(bookingData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await updateDoc(doc(db, "bookings", id), { status });
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (loading) return <div className={styles.loader}>Initializing Secure Admin Dashboard...</div>;

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        revenue: bookings.filter(b => b.status === 'confirmed').reduce((acc, b) => acc + (b.totalPrice || 0), 0)
    };

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.brand}>
                    <Car size={32} color="var(--primary)" />
                    <span>BUKHARI ADMIN</span>
                </div>

                <nav className={styles.nav}>
                    <div className={`${styles.navItem} ${styles.active}`}>
                        <LayoutDashboard size={20} />
                        Dashboard
                    </div>
                    <div className={styles.navItem}>
                        <CalendarCheck size={20} />
                        Bookings
                    </div>
                    <div className={styles.navItem}>
                        <Users size={20} />
                        Clients
                    </div>
                </nav>

                <button onClick={handleLogout} className={styles.logoutBtn}>
                    <LogOut size={20} />
                    Sign Out
                </button>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <header className={styles.header}>
                    <h1>Dashboard Overview</h1>
                    <div className={styles.userProfile}>
                        <span>Welcome, Admin</span>
                        <div className={styles.avatar}>A</div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <p>Total Bookings</p>
                            <h3>{stats.total}</h3>
                        </div>
                        <div className={styles.statIcon} style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--primary)' }}>
                            <CalendarCheck size={24} />
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <p>Pending Requests</p>
                            <h3>{stats.pending}</h3>
                        </div>
                        <div className={styles.statIcon} style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107' }}>
                            <Clock size={24} />
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <p>Confirmed Rides</p>
                            <h3>{stats.confirmed}</h3>
                        </div>
                        <div className={styles.statIcon} style={{ background: 'rgba(40, 167, 69, 0.1)', color: '#28a745' }}>
                            <CheckCircle size={24} />
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <p>Estimated Revenue</p>
                            <h3>Rs. {stats.revenue.toLocaleString()}</h3>
                        </div>
                        <div className={styles.statIcon} style={{ background: 'rgba(0, 123, 255, 0.1)', color: '#007bff' }}>
                            <TrendingUp size={24} />
                        </div>
                    </div>
                </div>

                {/* Bookings Table */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2>Recent Booking Requests</h2>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Car Details</th>
                                <th>Duration</th>
                                <th>Total Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>
                                        <div className={styles.customerInfo}>
                                            <span className={styles.customerName}>{booking.name}</span>
                                            <span className={styles.customerPhone}>{booking.phone}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.carInfo}>
                                            <span className={styles.carName}>{booking.carName}</span>
                                            <span className={styles.driverTag}>
                                                {booking.withDriver ? "With Driver" : "Self Drive"}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.duration}>
                                            <span>{booking.pickupDate}</span>
                                            <span className={styles.separator}>→</span>
                                            <span>{booking.returnDate}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={styles.price}>Rs. {booking.totalPrice?.toLocaleString()}</span>
                                    </td>
                                    <td>
                                        <span className={`${styles.status} ${styles[booking.status]}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actions}>
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'confirmed')}
                                                        className={styles.approveBtn}
                                                        title="Approve"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(booking.id, 'cancelled')}
                                                        className={styles.rejectBtn}
                                                        title="Reject"
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
