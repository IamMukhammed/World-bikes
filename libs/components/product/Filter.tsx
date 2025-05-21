import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductLocation, ProductType } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { productMileage } from '../../config';
import RefreshIcon from '@mui/icons-material/Refresh';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: ProductsInquiry;
	setSearchFilter: any;
	initialInput: ProductsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [productLocation, setProductLocation] = useState<ProductLocation[]>(Object.values(ProductLocation));
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchFilter?.search?.locationList?.length == 0) {
			delete searchFilter.search.locationList;
			setShowMore(false);
			router
				.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.typeList?.length == 0) {
			delete searchFilter.search.typeList;
			router
				.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.engineSizeList?.length == 0) {
			delete searchFilter.search.engineSizeList;
			router
				.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.options?.length == 0) {
			delete searchFilter.search.options;
			router
				.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.yearsList?.length == 0) {
			delete searchFilter.search.yearsList;
			router
				.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
						},
					})}`,
					{ scroll: false },
				)
				.then();
		}

		if (searchFilter?.search?.locationList) setShowMore(true);
	}, [searchFilter]);

	/** HANDLERS **/
	const productLocationSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, locationList: [...(searchFilter?.search?.locationList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.locationList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								locationList: searchFilter?.search?.locationList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('product:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productLocationSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productEsizeSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.engineSizeList?.includes(number)) {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									engineSizeList: searchFilter?.search?.engineSizeList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									engineSizeList: searchFilter?.search?.engineSizeList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, engineSizeList: [...(searchFilter?.search?.engineSizeList || []), number] },
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, engineSizeList: [...(searchFilter?.search?.engineSizeList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.engineSizeList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('productEsizeSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, productEsizeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productOptionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.options?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								options: searchFilter?.search?.options?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('productOptionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productOptionSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productYearSelectHandler = useCallback(
		async (number: Number) => {
			try {
				if (number != 0) {
					if (searchFilter?.search?.yearsList?.includes(number)) {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									yearsList: searchFilter?.search?.yearsList?.filter((item: Number) => item !== number),
								},
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: {
									...searchFilter.search,
									yearsList: searchFilter?.search?.yearsList?.filter((item: Number) => item !== number),
								},
							})}`,
							{ scroll: false },
						);
					} else {
						await router.push(
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, yearsList: [...(searchFilter?.search?.yearsList || []), number] },
							})}`,
							`/product?input=${JSON.stringify({
								...searchFilter,
								search: { ...searchFilter.search, yearsList: [...(searchFilter?.search?.yearsList || []), number] },
							})}`,
							{ scroll: false },
						);
					}
				} else {
					delete searchFilter?.search.yearsList;
					setSearchFilter({ ...searchFilter });
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					);
				}

				console.log('productYearSelectHandler:', number);
			} catch (err: any) {
				console.log('ERROR, productYearSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productMileageHandler = useCallback(
		async (e: any, type: string) => {
			const value = e.target.value;

			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileagesRange: { ...searchFilter.search.mileagesRange, start: value },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileagesRange: { ...searchFilter.search.mileagesRange, start: value },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileagesRange: { ...searchFilter.search.mileagesRange, end: value },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							mileagesRange: { ...searchFilter.search.mileagesRange, end: value },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/product?input=${JSON.stringify(initialInput)}`,
				`/product?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>MOTORCYCLES FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Motorcycle</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Location
					</p>
					<Stack
						className={`product-location`}
						style={{ height: showMore ? '253px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.locationList) {
								setShowMore(false);
							}
						}}
					>
						{productLocation.map((location: string) => {
							return (
								<Stack className={'input-box'} key={location}>
									<Checkbox
										id={location}
										className="product-checkbox"
										color="default"
										size="small"
										value={location}
										checked={(searchFilter?.search?.locationList || []).includes(location as ProductLocation)}
										onChange={productLocationSelectHandler}
									/>
									<label htmlFor={location} style={{ cursor: 'pointer' }}>
										<Typography className="product-type">{location}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Product Type</Typography>
					{productType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="product-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={productTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as ProductType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="product_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Engine Size (cc)</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.engineSizeList ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => productEsizeSelectHandler(0)}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.engineSizeList?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.engineSizeList?.includes(1) ? undefined : 'none',
							}}
							onClick={() => productEsizeSelectHandler(1)}
						>
							125
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.engineSizeList?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.engineSizeList?.includes(2) ? undefined : 'none',
							}}
							onClick={() => productEsizeSelectHandler(2)}
						>
							250
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.engineSizeList?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.engineSizeList?.includes(3) ? undefined : 'none',
							}}
							onClick={() => productEsizeSelectHandler(3)}
						>
							400
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.engineSizeList?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.engineSizeList?.includes(4) ? undefined : 'none',
								borderRight: searchFilter?.search?.engineSizeList?.includes(4) ? undefined : 'none',
							}}
							onClick={() => productEsizeSelectHandler(4)}
						>
							500
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.engineSizeList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => productEsizeSelectHandler(5)}
						>
							1000+
						</Button>
					</Stack>
				</Stack>
				{/* <Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Bedrooms</Typography>
					<Stack className="button-group">
						<Button
							sx={{
								borderRadius: '12px 0 0 12px',
								border: !searchFilter?.search?.yearsList ? '2px solid #181A20' : '1px solid #b9b9b9',
							}}
							onClick={() => productYearSelectHandler(0)}
						>
							Any
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.yearsList?.includes(1) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.yearsList?.includes(1) ? undefined : 'none',
							}}
							onClick={() => productYearSelectHandler(1)}
						>
							1
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.yearsList?.includes(2) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.yearsList?.includes(2) ? undefined : 'none',
							}}
							onClick={() => productYearSelectHandler(2)}
						>
							2
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.yearsList?.includes(3) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.yearsList?.includes(3) ? undefined : 'none',
							}}
							onClick={() => productYearSelectHandler(3)}
						>
							3
						</Button>
						<Button
							sx={{
								borderRadius: 0,
								border: searchFilter?.search?.yearsList?.includes(4) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.yearsList?.includes(4) ? undefined : 'none',
								// borderRight: false ? undefined : 'none',
							}}
							onClick={() => productYearSelectHandler(4)}
						>
							4
						</Button>
						<Button
							sx={{
								borderRadius: '0 12px 12px 0',
								border: searchFilter?.search?.yearsList?.includes(5) ? '2px solid #181A20' : '1px solid #b9b9b9',
								borderLeft: searchFilter?.search?.yearsList?.includes(5) ? undefined : 'none',
							}}
							onClick={() => productYearSelectHandler(5)}
						>
							5+
						</Button>
					</Stack>
				</Stack> */}
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Options</Typography>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Barter'}
							className="product-checkbox"
							color="default"
							size="small"
							value={'productBarter'}
							checked={(searchFilter?.search?.options || []).includes('productBarter')}
							onChange={productOptionSelectHandler}
						/>
						<label htmlFor={'Barter'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Barter</Typography>
						</label>
					</Stack>
					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="product-checkbox"
							color="default"
							size="small"
							value={'productRent'}
							checked={(searchFilter?.search?.options || []).includes('productRent')}
							onChange={productOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Rent</Typography>
						</label>
					</Stack>

					<Stack className={'input-box'}>
						<Checkbox
							id={'Rent'}
							className="product-checkbox"
							color="default"
							size="small"
							value={'productSale'}
							checked={(searchFilter?.search?.options || []).includes('productSale')}
							onChange={productOptionSelectHandler}
						/>
						<label htmlFor={'Rent'} style={{ cursor: 'pointer' }}>
							<Typography className="propert-type">Sale</Typography>
						</label>
					</Stack>

				</Stack>
				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Mileage</Typography>
					<Stack className="mileage-year-input">
						<FormControl>
							<InputLabel id="demo-simple-select-label">Min</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.mileagesRange?.start ?? 0}
								label="Min"
								onChange={(e: any) => productMileageHandler(e, 'start')}
								MenuProps={MenuProps}
							>
								{productMileage.map((mileage: number) => (
									<MenuItem
										value={mileage}
										disabled={(searchFilter?.search?.mileagesRange?.end || 0) < mileage}
										key={mileage}
									>
										{mileage}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<div className="central-divider"></div>
						<FormControl>
							<InputLabel id="demo-simple-select-label">Max</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={searchFilter?.search?.mileagesRange?.end ?? 500}
								label="Max"
								onChange={(e: any) => productMileageHandler(e, 'end')}
								MenuProps={MenuProps}
							>
								{productMileage.map((mileage: number) => (
									<MenuItem
										value={mileage}
										disabled={(searchFilter?.search?.mileagesRange?.start || 0) > mileage}
										key={mileage}
									>
										{mileage}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Stack>
				</Stack>
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="mileage-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
