import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '~/components/ui/sheet';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '~/components/ui/tooltip';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import { Cart } from '~/components/cart';
import { Logo } from '~/components/logo';
import { AccountMenu } from '~/components/account-menu';
import { FavoritesMenu } from '~/components/favorites-menu';

const routes = [
	{ id: 0, path: 'prints', label: 'Analog photo prints' },
	{ id: 1, path: 'experiences', label: 'Experiences' },
];

export function SiteHeader() {
	return (
		<header className='sticky top-0 z-20 bg-background'>
			<div className='mx-auto flex h-16 max-w-screen-xl items-center gap-4 px-4'>
				<div className='flex h-full items-center gap-3 p-2'>
					<Sidebar />
					<Logo className='size-8' />
					<Link
						href='/'
						className='flex items-center gap-2 px-2 text-xl font-bold tracking-tighter'
					>
						a Shop for Humans
					</Link>
				</div>
				<nav className='hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex [&_a]:transition-colors hover:[&_a]:text-foreground'>
					{routes.map((route) => (
						<Link key={route.id} href={route.path}>
							{route.label}
						</Link>
					))}
				</nav>
				<div className='ml-auto flex items-center gap-2'>
					<SearchBar className='hidden sm:block' />
					<FavoritesMenu />
					<Cart />
					<AccountMenu />
				</div>
			</div>
		</header>
	);
}

function SearchBar({ className }: Readonly<{ className?: string }>) {
	return (
		<form className={cn('relative max-w-lg lg:max-w-xs', className)}>
			<Search className='absolute left-2 top-2 size-4 text-muted-foreground' />
			<Input
				type='search'
				placeholder='Search products...'
				className='h-8 rounded-lg pl-8 text-sm sm:w-[200px] md:w-[200px] lg:w-[200px]'
			/>
		</form>
	);
}

function Sidebar() {
	return (
		<Sheet>
			<Tooltip>
				<SheetTrigger asChild>
					<TooltipTrigger asChild>
						<Button
							variant='ghost'
							size='icon'
							className='size-8 shrink-0 border border-border md:hidden'
						>
							<Menu className='size-4' />
							<span className='sr-only'>Menu</span>
						</Button>
					</TooltipTrigger>
				</SheetTrigger>
				<TooltipContent align='start'>Menu</TooltipContent>
				<SheetContent
					side='left'
					className='flex flex-col p-4 pt-12 w-[calc(100vw*0.8)]'
				>
					<SearchBar className='w-full sm:hidden' />
					{routes.map((route) => (
						<Button
							key={route.id}
							className='justify-start'
							variant='ghost'
						>
							<Link href={route.path}>{route.label}</Link>
						</Button>
					))}
				</SheetContent>
			</Tooltip>
		</Sheet>
	);
}
