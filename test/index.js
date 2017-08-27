'use strict';

process.env.NODE_ENV = 'test';

import test from 'ava';
import props from './../src/props';
import { getData, _compLoader, _compEmbed } from './../src/methods';

const element = '<gist-embed>';

test(`${element} properties: types & default values`, t => {
  t.is(props.user.type, String);
  t.is(props.user.value, '');

  t.is(props.uuid.type, String);
  t.is(props.uuid.value, '');

  t.is(props.noMeta.type, Boolean);
  t.is(props.noMeta.value, false);

  t.is(props._css.type, String);
  
  t.is(props._html.type, String);
  
  t.is(props._loading.type, Boolean);
  t.is(props._loading.value, true);
});

test(`${element} methods: _compLoader`, t => {
  t.is( _compLoader(), 'loading');
  t.is( _compLoader(true), 'loading show');
});

test(`${element} methods: _compEmbed`, t => {
  t.is( _compEmbed(), 'show');
  t.is( _compEmbed(true), '');
  t.is( _compEmbed(null, true), 'show no-meta');
  t.is( _compEmbed(true, true), ' no-meta');
});

// test(`${element} methods: getData`, async t => {
//   const data = await getData('moebiusmania', 'b7b862eb8d316a92a576d7373b3b42e7')
//     .then( data => {
//       return data;
//     });

//   t.is( typeof data, 'object');
//   t.is( data.owner, 'moebiusmania');
//   t.is( data.stylesheet, !undefined);
//   t.is( typeof data.div, 'string');
//   t.is( data.loading, false);
// });