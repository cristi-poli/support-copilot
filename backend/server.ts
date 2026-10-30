import express from "express";
import cors from "cors";

const app = express();
const PORT: number = 3000;

app.use(cors({
    origin: "http://localhost:4200"
}));

app.use(express.json());

type Ticket = {
    id: number;
    message: string;
    summary: string;
    category: string;
    priority: string;
    suggestedAction: string;
    status: string;
};

const tickets: Ticket[] = [];

const analyzeMessage = (message: string) => {
    const normalizedMessage = message.toLowerCase();

    if (
        normalizedMessage.includes("cannot login") ||
        normalizedMessage.includes("password") ||
        normalizedMessage.includes("locked")
    ) {
        return {
            summary: message,
            category: "Account Access",
            priority: "HIGH",
            suggestedAction: "Verify the account and start the recovery process."
        };
    }

    if (
        normalizedMessage.includes("refund") ||
        normalizedMessage.includes("money back")
    ) {
        return {
            summary: message,
            category: "Billing / Refund",
            priority: "MEDIUM",
            suggestedAction: "Review the refund request and payment details."
        };
    }

    if (
        normalizedMessage.includes("delivery") ||
        normalizedMessage.includes("shipping")
    ) {
        return {
            summary: message,
            category: "Delivery",
            priority: "MEDIUM",
            suggestedAction: "Check the delivery status and contact the customer."
        };
    }

    return {
        summary: message,
        category: "General Support",
        priority: "LOW",
        suggestedAction: "Review the customer request."
    };
};

app.get("/", (req, res) => {
    res.send("Support Copilot backend is running!");
});

app.post("/analyze", (req, res) => {
    const message: string = req.body.message;

    if (!message) {
        res.status(400).json({
            error: "Message is required."
        });
        return;
    }

    const analysis = analyzeMessage(message);

    const ticket: Ticket = {
        id: tickets.length + 1,
        message: message,
        summary: analysis.summary,
        category: analysis.category,
        priority: analysis.priority,
        suggestedAction: analysis.suggestedAction,
        status: "OPEN"
    };

    tickets.push(ticket);

    res.json(ticket);
});

app.get("/tickets", (req, res) => {
    res.json(tickets);
});

app.patch("/tickets/:id/resolve", (req, res) => {
    const ticketId = Number(req.params.id);

    const ticket = tickets.find(
        (ticket) => ticket.id === ticketId
    );

    if (!ticket) {
        res.status(404).json({
            error: "Ticket not found."
        });
        return;
    }

    ticket.status = "RESOLVED";

    res.json(ticket);
});

app.delete("/tickets", (req, res) => {
    tickets.length = 0;

    res.json({
        message: "All tickets were deleted."
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});