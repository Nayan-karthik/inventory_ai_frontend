//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-DisqNKjj.js
var statusOf = (p) => {
	if (p.currentStock <= p.reorderLevel * .6) return "critical";
	if (p.currentStock <= p.reorderLevel) return "restock";
	return "healthy";
};
var products = [
	{
		id: "p1",
		name: "Laptop",
		sku: "LAP-MBA-13",
		category: "Laptops",
		supplier: "Nordic Distribution",
		currentStock: 12,
		reorderLevel: 20,
		unitPrice: 98900,
		predictedDemand: 35,
		recommendedQty: 30,
		leadTimeDays: 3,
		safetyStock: 10
	},
	{
		id: "p2",
		name: "Wireless Mouse",
		sku: "ACC-WMP-02",
		category: "Accessories",
		supplier: "Kinetix Supply",
		currentStock: 18,
		reorderLevel: 25,
		unitPrice: 2499,
		predictedDemand: 40,
		recommendedQty: 35,
		leadTimeDays: 5,
		safetyStock: 12
	},
	{
		id: "p3",
		name: "Keyboard",
		sku: "ACC-MKB-87",
		category: "Accessories",
		supplier: "Kinetix Supply",
		currentStock: 65,
		reorderLevel: 30,
		unitPrice: 6499,
		predictedDemand: 42,
		recommendedQty: 0,
		leadTimeDays: 4,
		safetyStock: 15
	},
	{
		id: "p4",
		name: "Monitor",
		sku: "DSP-4K-27",
		category: "Displays",
		supplier: "Vertex Imports",
		currentStock: 8,
		reorderLevel: 15,
		unitPrice: 32900,
		predictedDemand: 25,
		recommendedQty: 25,
		leadTimeDays: 7,
		safetyStock: 8
	},
	{
		id: "p5",
		name: "USB-C Dock Station",
		sku: "ACC-DCK-11",
		category: "Accessories",
		supplier: "Vertex Imports",
		currentStock: 42,
		reorderLevel: 20,
		unitPrice: 8999,
		predictedDemand: 28,
		recommendedQty: 0,
		leadTimeDays: 6,
		safetyStock: 10
	},
	{
		id: "p6",
		name: "Noise Cancelling Headset",
		sku: "AUD-NCH-05",
		category: "Audio",
		supplier: "Nordic Distribution",
		currentStock: 21,
		reorderLevel: 24,
		unitPrice: 18999,
		predictedDemand: 33,
		recommendedQty: 22,
		leadTimeDays: 4,
		safetyStock: 9
	},
	{
		id: "p7",
		name: "Ergonomic Office Chair",
		sku: "FRN-CHR-09",
		category: "Furniture",
		supplier: "Halden Works",
		currentStock: 54,
		reorderLevel: 18,
		unitPrice: 21500,
		predictedDemand: 14,
		recommendedQty: 0,
		leadTimeDays: 10,
		safetyStock: 6
	},
	{
		id: "p8",
		name: "Portable SSD 2TB",
		sku: "STG-SSD-2T",
		category: "Storage",
		supplier: "Vertex Imports",
		currentStock: 9,
		reorderLevel: 22,
		unitPrice: 14999,
		predictedDemand: 31,
		recommendedQty: 30,
		leadTimeDays: 5,
		safetyStock: 11
	}
];
var categories = [
	"Laptops",
	"Accessories",
	"Displays",
	"Audio",
	"Storage",
	"Furniture"
];
var suppliers = [
	"Nordic Distribution",
	"Kinetix Supply",
	"Vertex Imports",
	"Halden Works"
];
function buildForecast(period, seed = 1) {
	const historyPoints = period === 7 ? 10 : period === 30 ? 14 : 18;
	const futurePoints = period === 7 ? 7 : period === 30 ? 12 : 16;
	const out = [];
	const base = 120 + seed * 14;
	for (let i = 0; i < historyPoints; i++) {
		const wave = Math.sin((i + seed) / 1.9) * 22;
		const drift = i * 2.4;
		const value = Math.round(base + wave + drift);
		out.push({
			label: `D-${historyPoints - i}`,
			actual: value,
			predicted: i === historyPoints - 1 ? value : null,
			rangeLow: null,
			rangeHigh: null
		});
	}
	const last = out[out.length - 1].actual;
	for (let i = 1; i <= futurePoints; i++) {
		const growth = i * (2.8 + seed * .2);
		const wave = Math.sin((historyPoints + i + seed) / 2.1) * 16;
		const predicted = Math.round(last + growth + wave);
		const spread = Math.round(8 + i * 2.1);
		out.push({
			label: `D+${i}`,
			actual: null,
			predicted,
			rangeLow: predicted - spread,
			rangeHigh: predicted + spread
		});
	}
	return out;
}
var inventoryHealth = [
	{
		name: "Healthy Stock",
		value: 72
	},
	{
		name: "Low Stock",
		value: 18
	},
	{
		name: "Critical",
		value: 10
	}
];
var recentSales = [
	{
		id: "s1",
		product: "Laptop",
		qty: 4,
		value: "₹3.95L",
		when: "12 min ago"
	},
	{
		id: "s2",
		product: "Wireless Mouse",
		qty: 22,
		value: "₹54,978",
		when: "48 min ago"
	},
	{
		id: "s3",
		product: "Monitor",
		qty: 3,
		value: "₹98,700",
		when: "2 h ago"
	},
	{
		id: "s4",
		product: "Portable SSD 2TB",
		qty: 7,
		value: "₹1.05L",
		when: "3 h ago"
	},
	{
		id: "s5",
		product: "Noise Cancelling Headset",
		qty: 5,
		value: "₹94,995",
		when: "5 h ago"
	},
	{
		id: "s6",
		product: "USB-C Dock Station",
		qty: 11,
		value: "₹98,989",
		when: "Yesterday"
	}
];
//#endregion
export { recentSales as a, products as i, categories as n, statusOf as o, inventoryHealth as r, suppliers as s, buildForecast as t };
