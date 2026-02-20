"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, Car as CarIcon } from "lucide-react";
import styles from "./BookingModal.module.css";
import { Car } from "@/data/fleet";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface BookingModalProps {
    car: Car | null;
    isOpen: boolean;
    onClose: () => void;
}

const BookingModal = ({ car, isOpen, onClose }: BookingModalProps) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        pickupDate: "",
        returnDate: "",
        withDriver: true
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!car) return;

        setLoading(true);
        setError("");

        try {
            await addDoc(collection(db, "bookings"), {
                ...formData,
                carId: car.id,
                carName: car.name,
                totalPrice: car.pricePerDay * calculateDays(formData.pickupDate, formData.returnDate),
                status: "pending",
                createdAt: serverTimestamp()
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 3000);
        } catch (err) {
            console.error("Booking error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const calculateDays = (start: string, end: string) => {
        if (!start || !end) return 1;
        const diff = new Date(end).getTime() - new Date(start).getTime();
        return Math.max(1, Math.ceil(diff / (1000 * 3600 * 24)));
    };

    if (!isOpen || !car) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay} onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={styles.modal}
                    onClick={e => e.stopPropagation()}
                >
                    <button className={styles.closeBtn} onClick={onClose}><X /></button>

                    {success ? (
                        <div className={styles.successMessage}>
                            <div className={styles.successIcon}>✓</div>
                            <h2>Booking Request Sent!</h2>
                            <p>We will contact you shortly to confirm your booking.</p>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            <div className={styles.carInfo}>
                                <div className={styles.carImagePlaceholder}>
                                    <CarIcon size={48} color="var(--primary)" />
                                </div>
                                <h3>{car.name}</h3>
                                <p className={styles.carType}>{car.type}</p>
                                <div className={styles.priceTag}>
                                    Rs. {car.pricePerDay.toLocaleString()} <span>/ day</span>
                                </div>
                                <ul className={styles.featureList}>
                                    {car.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                            </div>

                            <div className={styles.formContainer}>
                                <h2>Complete Your Booking</h2>
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label><User size={16} /> Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label><Phone size={16} /> Phone</label>
                                            <input
                                                type="tel"
                                                required
                                                placeholder="03xx xxxxxxx"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><Mail size={16} /> Email</label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.inputRow}>
                                        <div className={styles.inputGroup}>
                                            <label><Calendar size={16} /> Pickup Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.pickupDate}
                                                onChange={e => setFormData({ ...formData, pickupDate: e.target.value })}
                                            />
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label><Calendar size={16} /> Return Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={formData.returnDate}
                                                onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.toggleGroup}>
                                        <label>Include Driver?</label>
                                        <div className={styles.toggle}>
                                            <button
                                                type="button"
                                                className={formData.withDriver ? styles.active : ""}
                                                onClick={() => setFormData({ ...formData, withDriver: true })}
                                            >Yes</button>
                                            <button
                                                type="button"
                                                className={!formData.withDriver ? styles.active : ""}
                                                onClick={() => setFormData({ ...formData, withDriver: false })}
                                            >No</button>
                                        </div>
                                    </div>

                                    {error && <p className={styles.error}>{error}</p>}

                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={loading}
                                    >
                                        {loading ? "Processing..." : "Confirm Booking Request"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
