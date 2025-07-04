// import React, { useEffect, useState } from 'react';
// import '@toast-ui/editor/dist/toastui-editor.css';
// import { Viewer } from '@toast-ui/react-editor';
// import { Box, Stack, CircularProgress } from '@mui/material';

// const TViewer = (props: any) => {
// 	const [editorLoaded, setEditorLoaded] = useState(false);

// 	/** LIFECYCLES **/
// 	useEffect(() => {
// 		if (props.markdown) {
// 			setEditorLoaded(true);
// 		} else {
// 			setEditorLoaded(false);
// 		}
// 	}, [props.markdown]);

// 	return (
// 		<Stack sx={{ background: 'white', mt: '30px', borderRadius: '10px' }}>
// 			<Box component={'div'} sx={{ m: '40px' }}>
// 				{editorLoaded ? (
// 					<Viewer
// 						initialValue={props.markdown}
// 						customHTMLRenderer={{
// 							htmlBlock: {
// 								iframe(node: any) {
// 									return [
// 										{
// 											type: 'openTag',
// 											tagName: 'iframe',
// 											outerNewLine: true,
// 											attributes: node.attrs,
// 										},
// 										{ type: 'html', content: node.childrenHTML ?? '' },
// 										{ type: 'closeTag', tagName: 'iframe', outerNewLine: true },
// 									];
// 								},
// 								div(node: any) {
// 									return [
// 										{ type: 'openTag', tagName: 'div', outerNewLine: true, attributes: node.attrs },
// 										{ type: 'html', content: node.childrenHTML ?? '' },
// 										{ type: 'closeTag', tagName: 'div', outerNewLine: true },
// 									];
// 								},
// 							},
// 							htmlInline: {
// 								big(node: any, { entering }: any) {
// 									return entering
// 										? { type: 'openTag', tagName: 'big', attributes: node.attrs }
// 										: { type: 'closeTag', tagName: 'big' };
// 								},
// 							},
// 						}}
// 					/>
// 				) : (
// 					<CircularProgress />
// 				)}
// 			</Box>
// 		</Stack>
// 	);
// };

// export default TViewer;

import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import axios from 'axios';
import { T } from '../../types/common';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { typeFromAST } from 'graphql';
import { Message } from '../../enums/common.enum';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../sweetAlert';

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null),
		token = getJwtToken(),
		router = useRouter();
	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.FREE);

	/** APOLLO REQUESTS **/
	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	const memoizedValues = useMemo(() => {
		const articleTitle = '',
			articleContent = '',
			articleImage = '';

		return { articleTitle, articleContent, articleImage };
	}, []);

	/** HANDLERS **/
	const uploadImage = async (image: any) => {
		try {
			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target)
				  }`,
					variables: {
						file: null,
						target: 'article',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', image);

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			console.log('=responseImage: ', responseImage);
			memoizedValues.articleImage = responseImage;

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('Error, uploadImage:', err);
		}
	};

	const changeCategoryHandler = (e: any) => {
		setArticleCategory(e.target.value);
	};

	const articleTitleHandler = (e: T) => {
		console.log(e.target.value);
		memoizedValues.articleTitle = e.target.value;
	};

	const handleRegisterButton = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() as string;
			memoizedValues.articleContent = articleContent;

			if (memoizedValues.articleContent === '' && memoizedValues.articleTitle === '') {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}

			await createBoardArticle({
				variables: {
					input: {
						...memoizedValues,
						articleCategory,
					},
				},
			});
			await sweetTopSuccessAlert('Article is created succeefully', 700);
			await router.push({
				pathname: '/mypage',
				query: {
					categry: 'myArticles',
				},
			});
		} catch (err: any) {
			console.log(err);
			sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS)).then();
		}
	};

	const doDisabledCheck = () => {
		if (memoizedValues.articleContent === '' || memoizedValues.articleTitle === '') {
			return true;
		}
	};

	return (
		<Stack>
			<Stack direction="row" style={{ margin: '40px' }} justifyContent="space-evenly">
				<Box component={'div'} className={'form_row'} style={{ width: '300px' }}>
					<Typography style={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Category
					</Typography>
					<FormControl sx={{ width: '100%', background: 'white' }}>
						<Select
							value={articleCategory}
							onChange={changeCategoryHandler}
							displayEmpty
							inputProps={{ 'aria-label': 'Without label' }}
						>
							<MenuItem value={BoardArticleCategory.FREE}>
								<span>Free</span>
							</MenuItem>
							<MenuItem value={BoardArticleCategory.HUMOR}>Humor</MenuItem>
							<MenuItem value={BoardArticleCategory.NEWS}>News</MenuItem>
							<MenuItem value={BoardArticleCategory.RECOMMEND}>Recommendation</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box component={'div'} style={{ width: '300px', flexDirection: 'column' }}>
					<Typography style={{ color: '#7f838d', margin: '10px' }} variant="h3">
						Title
					</Typography>
					<TextField
						onChange={articleTitleHandler}
						id="filled-basic"
						label="Type Title"
						style={{ width: '300px', background: 'white' }}
					/>
				</Box>
			</Stack>

			<Editor
				initialValue={'Type here'}
				placeholder={'Type here'}
				previewStyle={'vertical'}
				height={'640px'}
				// @ts-ignore
				initialEditType={'WYSIWYG'}
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						const uploadedImageURL = await uploadImage(image);
						callback(uploadedImageURL);
						return false;
					},
				}}
				events={{
					load: function (param: any) {},
				}}
			/>

			<Stack direction="row" justifyContent="center">
				<Button
					variant="contained"
					color="primary"
					style={{ margin: '30px', width: '250px', height: '45px' }}
					onClick={handleRegisterButton}
				>
					Register
				</Button>
			</Stack>
		</Stack>
	);
};

export default TuiEditor;
