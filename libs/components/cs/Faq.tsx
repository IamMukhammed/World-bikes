import React, { SyntheticEvent, useState } from 'react';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { AccordionDetails, Box, Stack, Typography } from '@mui/material';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
	({ theme }) => ({
		border: `1px solid ${theme.palette.divider}`,
		'&:not(:last-child)': {
			borderBottom: 0,
		},
		'&:before': {
			display: 'none',
		},
	}),
);
const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon sx={{ fontSize: '1.4rem' }} />} {...props} />
))(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : '#fff',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const Faq = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const [category, setCategory] = useState<string>('product');
	const [expanded, setExpanded] = useState<string | false>('panel1');

	/** APOLLO REQUESTS **/
	/** LIFECYCLES **/

	/** HANDLERS **/
	const changeCategoryHandler = (category: string) => {
		setCategory(category);
	};

	const handleChange = (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	const data: any = {
		property: [
			{
				id: '00f5a45ed8897f8090116a01',
				subject: 'Are the motorcycles listed on the site reliable?',
				content: 'Absolutely, we only list verified and inspected motorcycles.',
			},
			{
				id: '00f5a45ed8897f8090116a22',
				subject: 'What types of motorcycles do you offer?',
				content: 'We offer sport bikes, cruisers, touring bikes, dirt bikes, scooters, and electric motorcycles.',
			},
			{
				id: '00f5a45ed8897f8090116a21',
				subject: 'How can I search for motorcycles on your website?',
				content: 'Use our search bar to filter by brand, model, year, price, mileage, and location.',
			},
			{
				id: '00f5a45ed8897f8090116a23',
				subject: 'Do you provide assistance for first-time motorcycle buyers?',
				content: 'Yes, we help you understand specs, riding needs, and financing options.',
			},
			{
				id: '00f5a45ed8897f8090116a24',
				subject: 'What should I consider when buying a motorcycle?',
				content: 'Check engine condition, mileage, maintenance history, and whether it fits your riding style.',
			},
			{
				id: '00f5a45ed8897f8090116a25',
				subject: 'How long does the motorcycle buying process typically take?',
				content: 'It usually takes 1 to 3 days depending on documentation and payment.',
			},
			{
				id: '00f5a45ed8897f8090116a29',
				subject: 'What if I face issues with the motorcycle after purchase?',
				content: 'We offer post-sale support and connect you with trusted service centers.',
			},
			{
				id: '00f5a45ed8897f8090116a28',
				subject: 'Do you offer motorcycles in specific regions or cities?',
				content: 'Yes, we have listings across various regions tailored to your preferences.',
			},
			{
				id: '00f5a45ed8897f8090116a27',
				subject: 'Can I sell my motorcycle through your platform?',
				content: 'Absolutely, you can list your motorcycle for sale directly through our website.',
			},
			{
				id: '00f5a45ed8897f8090116b99',
				subject: 'Can you help with the legal aspects of motorcycle purchase?',
				content: 'Yes, we offer basic guidance and connect you with legal and registration experts if needed.',
			},
		],
		payment: [
			{
				id: '00f5a45ed8897f8090116a02',
				subject: 'How can I make the payment?',
				content: 'You can make the payment securely online or through one of our trusted agents.',
			},
			{
				id: '00f5a45ed8897f8090116a91',
				subject: 'Are there any additional fees for using your services?',
				content: 'No, buyers use our platform for free. Sellers are charged a commission after a successful sale.',
			},
			{
				id: '00f5a45ed8897f8090116a92',
				subject: 'Is there an option for installment payments?',
				content: 'Yes, installment plans are available for selected motorcycles. Contact us for eligibility.',
			},
			{
				id: '00f5a45ed8897f8090116a93',
				subject: 'Is my payment information secure on your website?',
				content: 'Yes, we use advanced encryption and security standards to protect your payment data.',
			},
			{
				id: '00f5a45ed8897f8090116a94',
				subject: 'Can I make payments online through your website?',
				content: 'Yes, our payment system allows for fast and secure online transactions.',
			},
			{
				id: '00f5a45ed8897f8090116a95',
				subject: "What happens if there's an issue with my payment?",
				content: 'If you experience any payment issues, our support team is ready to assist you promptly.',
			},
			{
				id: '00f5a45ed8897f8090116a96',
				subject: 'Do you offer refunds for payments made?',
				content:
					'Refunds depend on specific cases and product conditions. Please check our refund policy or contact support.',
			},
			{
				id: '00f5a45ed8897f8090116a97',
				subject: 'Are there any discounts or incentives for early payments?',
				content: 'Yes, we occasionally offer early payment discounts. Stay tuned to our promotions page or contact us.',
			},
			{
				id: '00f5a45ed8897f8090116a99',
				subject: 'How long does it take for payments to be processed?',
				content: 'Payments via credit/debit cards are typically instant. Other methods may take 1–2 business days.',
			},
			{
				id: '00f5a45ed8897f8090116a98',
				subject: 'Are there penalties for late payments?',
				content:
					'Late fees may apply depending on your installment agreement. Refer to your contract or contact support.',
			},
		],
		buyers: [
			{
				id: '00f5a45ed8897f8090116a03',
				subject: 'What should buyers pay attention to?',
				content:
					'Buyers should inspect the motorcycle’s condition, mileage, maintenance history, and legal documents before making a decision.',
			},
			{
				id: '00f5a45ed8897f8090116a85',
				subject: 'How can I determine if a motorcycle is within my budget?',
				content:
					'Calculate your budget by factoring in the bike’s price, insurance, registration fees, and potential maintenance. Our team can help you find options that match your budget.',
			},
			{
				id: '00f5a45ed8897f8090116a84',
				subject: 'What documents do I need to provide when buying a motorcycle?',
				content:
					'You’ll typically need a valid ID, proof of payment, and in some cases, a motorcycle license. We’ll guide you through the required documentation.',
			},
			{
				id: '00f5a45ed8897f8090116a83',
				subject: 'What factors should I consider when choosing a motorcycle?',
				content:
					'Consider your riding experience, intended use (commuting, sport, touring), engine size, fuel economy, comfort, and resale value.',
			},
			{
				id: '00f5a45ed8897f8090116a82',
				subject: 'Can I negotiate the price of a motorcycle?',
				content:
					'Yes, price negotiations are often possible. We can assist you in making fair offers and negotiating with sellers.',
			},
			{
				id: '00f5a45ed8897f8090116a81',
				subject: 'What are some red flags to watch out for when viewing motorcycles?',
				content:
					'Look out for engine noise, oil leaks, worn tires, rust, frame damage, or inconsistent service history.',
			},
			{
				id: '00f5a45ed8897f8090116a80',
				subject: 'Do you provide assistance with motorcycle inspections?',
				content: 'Yes, we can connect you with trusted mechanics who can perform a pre-purchase inspection.',
			},
			{
				id: '00f5a45ed8897f8090116a79',
				subject: 'How long does it typically take to find the right motorcycle?',
				content:
					'It depends on your preferences and availability in the market. We work quickly to match you with the right options.',
			},
			{
				id: '00f5a45ed8897f8090116a78',
				subject: 'What are the advantages of using your service when buying a motorcycle?',
				content:
					'We provide verified listings, professional support, safe payment channels, and help with documentation — saving you time and effort.',
			},
			{
				id: '00f5a45ed8897f8090116a77',
				subject: 'What happens if I change my mind after agreeing to buy a motorcycle?',
				content:
					'Depending on the agreement and payment status, you may be able to cancel or request changes. Please contact our support team for assistance.',
			},
		],

		agents: [
			{
				id: '00f5a45ed8897f8090116a04',
				subject: 'What do I need to do if I want to become an agent?',
				content:
					'If you want to become a motorcycle sales agent, please read our terms and conditions and contact the admin for registration.',
			},
			{
				id: '00f5a45ed8897f8090116a62',
				subject: 'What qualifications do I need to become a motorcycle sales agent?',
				content:
					'While formal licenses aren’t always required, experience in sales, good communication, and product knowledge are key.',
			},
			{
				id: '00f5a45ed8897f8090116a63',
				subject: 'How do I find clients as a new motorcycle sales agent?',
				content:
					'Build a local network, promote on social media, participate in events, and list motorcycles on online platforms.',
			},
			{
				id: '00f5a45ed8897f8090116a64',
				subject: 'What are some effective marketing strategies for selling motorcycles?',
				content:
					'Use high-quality images, post on social media, offer promotions, attend local events, and build trust with clients.',
			},
			{
				id: '00f5a45ed8897f8090116a65',
				subject: 'How do I handle negotiations with buyers and sellers?',
				content:
					'Listen actively, understand the bike’s value, set realistic expectations, and aim for win-win solutions.',
			},
			{
				id: '00f5a45ed8897f8090116a66',
				subject: 'What should I do to stay updated with motorcycle market trends?',
				content: 'Follow motorcycle blogs, join communities, subscribe to industry news, and attend trade shows.',
			},
			{
				id: '00f5a45ed8897f8090116a67',
				subject: 'How do I handle difficult clients or situations?',
				content: 'Be professional and patient, understand their concerns, and provide clear and honest communication.',
			},
			{
				id: '00f5a45ed8897f8090116a68',
				subject: 'What tools and technologies should I utilize as a motorcycle sales agent?',
				content: 'Use CRM systems, online listing platforms, chat support tools, and digital payment services.',
			},
			{
				id: '00f5a45ed8897f8090116a69',
				subject: 'How do I ensure compliance with regulations and buyer protection laws?',
				content:
					'Stay updated on vehicle sale regulations, issue proper documentation, and follow fair trade practices.',
			},
			{
				id: '00f5a45ed8897f8090116a70',
				subject: 'What strategies can I use to grow my motorcycle sales business?',
				content:
					'Deliver excellent service, request client referrals, build a strong reputation, and invest in online visibility.',
			},
		],
		membership: [
			{
				id: '00f5a45ed8897f8090116a05',
				subject: 'Do you have a membership service on your site?',
				content: 'Membership service is not available on our motorcycle platform yet!',
			},
			{
				id: '00f5a45ed8897f8090116a60',
				subject: 'What are the benefits of becoming a member on your website?',
				content:
					'We currently do not offer membership benefits, but we may introduce exclusive deals and tools in the future.',
			},
			{
				id: '00f5a45ed8897f8090116a59',
				subject: 'Is there a fee associated with becoming a member?',
				content: 'Since the membership program is not active yet, there are no fees involved at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a58',
				subject: 'Will membership provide access to exclusive content or features?',
				content: "Currently, we don't offer member-only content or features. But it's something we're exploring.",
			},
			{
				id: '00f5a45ed8897f8090116a57',
				subject: 'How can I sign up for a membership on your site?',
				content: 'Membership registration is not available yet. We will notify users once it’s launched.',
			},
			{
				id: '00f5a45ed8897f8090116a56',
				subject: 'Do members receive discounts on motorcycle listings or services?',
				content: 'Membership discounts are not offered at the moment.',
			},
			{
				id: '00f5a45ed8897f8090116a55',
				subject: 'Are there plans to introduce a membership program in the future?',
				content:
					"While we can't confirm a timeline, we're actively considering membership options to enhance the user experience.",
			},
			{
				id: '00f5a45ed8897f8090116a54',
				subject: 'What kind of content or benefits can members expect if a membership program is introduced?',
				content:
					'We are reviewing potential benefits like early access to listings, exclusive deals, and advanced tools.',
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Do you offer a premium membership option on your platform?',
				content: 'No, a premium membership option is not yet available.',
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Will membership grant access to exclusive deals or discounts?',
				content: 'Currently, there are no exclusive deals linked to membership. Stay tuned for future updates.',
			},
		],
		community: [
			{
				id: '00f5a45ed8897f8090116a06',
				subject: 'What should I do if there is abusive or criminal behavior in the community section?',
				content:
					'If you come across abusive or suspicious behavior in the community, please report it immediately or contact our admin team.',
			},
			{
				id: '00f5a45ed8897f8090116a44',
				subject: 'How can I participate in the community section of your website?',
				content:
					'Simply create an account on our platform to join discussions, ask questions, and share your motorcycle experiences.',
			},
			{
				id: '00f5a45ed8897f8090116a45',
				subject: 'Are there guidelines for posting?',
				content:
					'Yes, please make sure to follow our community posting guidelines to ensure respectful and relevant discussions.',
			},
			{
				id: '00f5a45ed8897f8090116a46',
				subject: 'What should I do if I encounter spam or irrelevant posts?',
				content:
					'Use the “Report” button or contact admin so we can take appropriate action against spam or off-topic content.',
			},
			{
				id: '00f5a45ed8897f8090116a47',
				subject: 'Can I connect with other members outside of the community section?',
				content: 'Currently, private messaging or external connections between members are not supported.',
			},
			{
				id: '00f5a45ed8897f8090116a48',
				subject: 'Can I share personal experiences or recommendations?',
				content:
					'Absolutely! Sharing relevant motorcycle experiences, reviews, or recommendations is highly encouraged.',
			},
			{
				id: '00f5a45ed8897f8090116a49',
				subject: 'How can I ensure privacy?',
				content:
					'Avoid posting any personal or sensitive information such as your phone number, address, or financial details.',
			},
			{
				id: '00f5a45ed8897f8090116a50',
				subject: 'How can I contribute positively?',
				content: 'Respect other users, share helpful advice, and keep conversations constructive and on-topic.',
			},
			{
				id: '00f5a45ed8897f8090116a51',
				subject: 'What if I notice misinformation?',
				content:
					'If you see false or misleading information, please either reply with correct info or report it to the moderators.',
			},
			{
				id: '00f5a45ed8897f8090116a52',
				subject: 'Are there moderators?',
				content: 'Yes, our platform is actively monitored by moderators to maintain a safe and helpful environment.',
			},
		],
		other: [
			{
				id: '00f5a45ed8897f8090116a40',
				subject: 'Who should I contact if I want to buy your site?',
				content: 'Thanks for your interest, but we currently have no plans to sell the platform.',
			},
			{
				id: '00f5a45ed8897f8090116a39',
				subject: 'Can I advertise my services on your website?',
				content: 'At the moment, we do not offer advertising slots or listings on our site.',
			},
			{
				id: '00f5a45ed8897f8090116a38',
				subject: 'Are there sponsorship opportunities available on your platform?',
				content: 'We currently do not provide sponsorship packages or promotional placements.',
			},
			{
				id: '00f5a45ed8897f8090116a36',
				subject: 'Can I contribute guest posts or articles to your website?',
				content: 'Guest submissions are not accepted at this time, but we may consider them in the future.',
			},
			{
				id: '00f5a45ed8897f8090116a35',
				subject: 'Is there a referral program for recommending your website to others?',
				content: 'We currently do not have a referral or invite program set up.',
			},
			{
				id: '00f5a45ed8897f8090116a34',
				subject: 'Do you offer affiliate partnerships for promoting your services?',
				content: 'We are not offering affiliate partnerships at this time.',
			},
			{
				id: '00f5a45ed8897f8090116a33',
				subject: 'Can I purchase merchandise related to your website?',
				content: 'Official merchandise is not available yet, but it may be considered in future updates.',
			},
			{
				id: '00f5a45ed8897f8090116a32',
				subject: 'Are there any job openings or opportunities to work with your team?',
				content: 'There are no open positions currently. Please check back later for future opportunities.',
			},
			{
				id: '00f5a45ed8897f8090116a31',
				subject: 'Do you host events or webinars related to motorcycles?',
				content: 'We are not hosting events or webinars right now, but this may change in the future.',
			},
			{
				id: '00f5a45ed8897f8090116a30',
				subject: 'Can I request custom features or functionalities for your website?',
				content: 'We are not accepting custom feature requests at this time.',
			},
		],
	};

	if (device === 'mobile') {
		return <div>FAQ MOBILE</div>;
	} else {
		return (
			<Stack className={'faq-content'}>
				<Box className={'categories'} component={'div'}>
					<div
						className={category === 'product' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('product');
						}}
					>
						Motorcycle
					</div>
					<div
						className={category === 'payment' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('payment');
						}}
					>
						Payment
					</div>
					<div
						className={category === 'buyers' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('buyers');
						}}
					>
						For Buyers
					</div>
					<div
						className={category === 'agents' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('agents');
						}}
					>
						For Agents
					</div>
					<div
						className={category === 'membership' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('membership');
						}}
					>
						Membership
					</div>
					<div
						className={category === 'community' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('community');
						}}
					>
						Community
					</div>
					<div
						className={category === 'other' ? 'active' : ''}
						onClick={() => {
							changeCategoryHandler('other');
						}}
					>
						Other
					</div>
				</Box>
				<Box className={'wrap'} component={'div'}>
					{data[category] &&
						data[category].map((ele: any) => (
							<Accordion expanded={expanded === ele?.id} onChange={handleChange(ele?.id)} key={ele?.subject}>
								<AccordionSummary id="panel1d-header" className="question" aria-controls="panel1d-content">
									<Typography className="badge" variant={'h4'}>
										Q
									</Typography>
									<Typography> {ele?.subject}</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Stack className={'answer flex-box'}>
										<Typography className="badge" variant={'h4'} color={'primary'}>
											A
										</Typography>
										<Typography> {ele?.content}</Typography>
									</Stack>
								</AccordionDetails>
							</Accordion>
						))}
				</Box>
			</Stack>
		);
	}
};

export default Faq;
