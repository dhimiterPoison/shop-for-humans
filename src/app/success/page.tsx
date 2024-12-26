'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '~/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '~/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface OrderDetails {
	id: string;
	amount: number;
	status: string;
	items: Array<{
		id: string;
		name: string;
		quantity: number;
		price: number;
	}>;
}

export default function SuccessPage() {
	const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
	const searchParams = useSearchParams();
	const sessionId = searchParams.get('session_id');

	useEffect(() => {
		if (sessionId) {
			// In a real application, you would fetch the order details from your backend
			// For this example, we'll simulate fetching order details
			const fetchOrderDetails = async () => {
				// Simulated API call
				const response = await new Promise<OrderDetails>((resolve) => {
					setTimeout(() => {
						resolve({
							id:
								'ord_' +
								Math.random().toString(36).substr(2, 9),
							amount: 15999,
							status: 'paid',
							items: [
								{
									id: 'item1',
									name: 'T-Shirt',
									quantity: 2,
									price: 2999,
								},
								{
									id: 'item2',
									name: 'Jeans',
									quantity: 1,
									price: 9999,
								},
							],
						});
					}, 1000);
				});
				setOrderDetails(response);
			};

			fetchOrderDetails().catch((error) => {
				console.error('Failed to fetch order details:', error);
				// Handle error appropriately
			});
		}
	}, [sessionId]);

	if (!orderDetails) {
		return (
			<div className='flex min-h-screen items-center justify-center'>
				Loading...
			</div>
		);
	}

	return (
		<div className='flex min-h-screen items-center justify-center bg-background p-4'>
			<Card className='w-full max-w-2xl'>
				<CardHeader>
					<div className='flex items-center space-x-2'>
						<CheckCircle className='h-6 w-6 text-green-500' />
						<CardTitle>Payment Successful</CardTitle>
					</div>
					<CardDescription>
						Your order has been processed successfully.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div>
							<h3 className='font-semibold'>Order Details</h3>
							<p>Order ID: {orderDetails.id}</p>
							<p>Status: {orderDetails.status}</p>
							<p>
								Total Amount: $
								{(orderDetails.amount / 100).toFixed(2)}
							</p>
						</div>
						<div>
							<h3 className='font-semibold'>Items</h3>
							<ul className='list-inside list-disc'>
								{orderDetails.items.map((item) => (
									<li key={item.id}>
										{item.name} - Quantity: {item.quantity}{' '}
										- ${(item.price / 100).toFixed(2)} each
									</li>
								))}
							</ul>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button asChild className='w-full'>
						<Link href='/'>Return to Shop</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
