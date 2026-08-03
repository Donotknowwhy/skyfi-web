
const SkeletonLoader = () => {
	return (
		<div className="min-h-screen bg-gray-50 py-4 md:py-8">
			<div className="container mx-auto px-4">
				<div className="mx-auto max-w-6xl">
					{/* SIM Selection Skeleton */}
					<div className="mb-6 md:mb-8">
						<div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
							<div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
							<div className="space-y-3">
								<div className="h-4 bg-gray-200 rounded w-3/4"></div>
								<div className="h-4 bg-gray-200 rounded w-1/2"></div>
							</div>
						</div>
					</div>

					{/* Package Selection Grid Skeleton */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
						{[...Array(4)].map((_, index) => (
							<div key={index} className="bg-white rounded-lg p-4 shadow-sm border animate-pulse">
								<div className="space-y-3">
									<div className="h-5 bg-gray-200 rounded w-3/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/2"></div>
									<div className="h-4 bg-gray-200 rounded w-2/3"></div>
									<div className="h-6 bg-gray-200 rounded w-1/3 mt-4"></div>
								</div>
							</div>
						))}
					</div>

					{/* Note Skeleton */}
					<div className="mb-6 md:mb-8">
						<div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
					</div>

					{/* Order Summary Skeleton */}
					<div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
						<div className="space-y-4">
							<div className="h-6 bg-gray-200 rounded w-1/3"></div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<div className="h-4 bg-gray-200 rounded w-1/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/6"></div>
								</div>
								<div className="flex justify-between">
									<div className="h-4 bg-gray-200 rounded w-1/3"></div>
									<div className="h-4 bg-gray-200 rounded w-1/5"></div>
								</div>
								<div className="flex justify-between">
									<div className="h-4 bg-gray-200 rounded w-1/4"></div>
									<div className="h-4 bg-gray-200 rounded w-1/6"></div>
								</div>
							</div>
							<div className="border-t pt-4">
								<div className="flex justify-between">
									<div className="h-5 bg-gray-200 rounded w-1/4"></div>
									<div className="h-5 bg-gray-200 rounded w-1/5"></div>
								</div>
							</div>
							<div className="flex gap-3 mt-6">
								<div className="h-10 bg-gray-200 rounded flex-1"></div>
								<div className="h-10 bg-gray-200 rounded flex-1"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
