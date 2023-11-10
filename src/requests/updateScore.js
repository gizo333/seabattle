import axios from "axios";

export async function updateScoreOnServer() {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const response = await axios.post("http://localhost:4199/user-data", { token, updateScore: true });

            console.log("Score updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating score:", error);
        }
    }
}

export async function updateScoreFail() {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const response = await axios.post("http://localhost:4199/user-data", { token, updateScoreFail: true });

            console.log("Score updated successfully:", response.data);
        } catch (error) {
            console.error("Error updating score:", error);
        }
    }
}