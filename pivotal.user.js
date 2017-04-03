// has embedded jQuery 2.1.4
// ==UserScript==
// @name         Keyprism3 Pivotal
// @namespace    http://mrobbinsassoc.com/
// @version      0.0.2
// @description  Allows interaction of Pivotal Tracker, Yodiz, TheBrain and Visual Paradigm
// @author       Mark Robbins
// @match        https://www.pivotaltracker.com/n/projects/1997711*
// @match        https://www.pivotaltracker.com/n/projects/1999485*
// @match        https://www.pivotaltracker.com/n/projects/2000741*
// @grant        none
// @copyright    2017, Mark Robbins
// @homepageURL  http://mrobbinsassoc.com/projects/keyprism3/vp/publish/
// @supportURL   mailto:mark.robbins@mrobbinsassoc.com
// @updateURL    https://openuserjs.org/meta/MarkRobbins/Keyprism3_Pivotal.meta.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.4.1/tinycolor.min.js
// ==/UserScript==
// ==OpenUserJS==
// @author MarkRobbins
// ==/OpenUserJS==

/* globals tinycolor Sass */
//console.log('Keyprism3 Pivotal pushed webhook');
tinycolor=window['tinycolor'];

document.documentElement.style.backgroundColor = "black";
const clr={
  _name:'clr'
  ,status:{
    accepted:'#008800'
    ,unscheduled:'#000088'
    ,unstarted:'#888888'
    ,started:'#884400'
    ,finished:'#888800'
    ,delivered:'#880088'
    ,rejected:'#880000'
  }
  ,chore:{
    bg:'#000044'
    ,b:'#0000aa'
    ,c:'#4444aa'
    ,filters:{
      section_edit_maximize_before:'invert(1) brightness(0.5) sepia(1) saturate(140) hue-rotate(207deg) brightness(2)'
      ,model_preview_expander_before:'sepia(1) brightness(0.2) saturate(23) hue-rotate(229deg)'
      ,model_section_edit_fieldset_name_collapser:'sepia(1) brightness(1) saturate(89) hue-rotate(229deg)'
      ,meta_after:'sepia(1) brightness(0.2) saturate(23) hue-rotate(229deg)'
    }
    ,images:{
      model_fieldset_story_name_before:{
        url:'//d1x0rkxtisrwrz.cloudfront.net/next/assets/next/b0ea4009-chore.png'
        ,w:'18'
        ,h:'14'
      }
    }
  }
  ,feature:{
    bg:'#444400'
    ,b:'#666600'
    ,c:'#888833'
    ,filters:{
      section_edit_maximize_before:'invert(1) brightness(0.5) sepia(1) saturate(40) hue-rotate(34deg)'
      ,model_preview_expander_before:'sepia(1) brightness(0.2) saturate(23) hue-rotate(48deg)'
      ,model_section_edit_fieldset_name_collapser:'sepia(1) brightness(2) saturate(47) hue-rotate(32deg)'
      ,meta_after:'sepia(1) brightness(0.2) saturate(23) hue-rotate(52deg)'
    }
    ,images:{
      model_fieldset_story_name_before:{
        url:'//d1x0rkxtisrwrz.cloudfront.net/next/assets/next/902493c4-feature.png'
        ,w:'18'
        ,h:'16'
      }
    }
  }
  ,bug:{
    bg:'#440000'
    ,b:'#660000'
    ,c:'#882222'
    ,filters:{
      section_edit_maximize_before:'invert(1) brightness(0.5) sepia(1) saturate(40) hue-rotate(0deg)'
      ,model_preview_expander_before:'sepia(1) brightness(0.2) saturate(23) hue-rotate(0deg)'
      ,model_section_edit_fieldset_name_collapser:'sepia(1) brightness(1) saturate(85) hue-rotate(0deg)'
      ,meta_after:'sepia(1) brightness(0.2) saturate(23) hue-rotate(0deg)'
    }
    ,images:{
      model_fieldset_story_name_before:{
        url:'//d1x0rkxtisrwrz.cloudfront.net/next/assets/next/ef3f29e8-bug.png'
        ,w:'18'
        ,h:'15'
      }
    }
  }
  ,release:{
    bg:'#004400'
    ,b:'#006600'
    ,c:'#228822'
    ,filters:{
      section_edit_maximize_before:'invert(1) brightness(0.5) sepia(1) saturate(40) hue-rotate(85deg)'
      ,model_preview_expander_before:'sepia(1) brightness(0.2) saturate(23) hue-rotate(85deg)'
      ,model_section_edit_fieldset_name_collapser:'sepia(1) brightness(2) saturate(23) hue-rotate(85deg)'
      ,meta_after:'sepia(1) brightness(0.2) saturate(23) hue-rotate(85deg)'
    }
    ,images:{
      model_fieldset_story_name_before:{
        url:'//d1x0rkxtisrwrz.cloudfront.net/next/assets/next/e6974165-release.png'
        ,w:'18'
        ,h:'15'
      }
    }
  }
  ,epic:{
    bg:'#2F1B4C'
    ,b:'#523181'
    ,c:'#634292'
    ,filters:{
      section_edit_maximize_before:'invert(1) brightness(0.5) sepia(1) saturate(40) hue-rotate(253deg)'
      ,model_preview_expander_before:'sepia(1) brightness(0.2) saturate(23) hue-rotate(253deg)'
      ,model_section_edit_fieldset_name_collapser:'sepia(1) brightness(2) saturate(23) hue-rotate(253deg)'
      ,meta_after:'sepia(1) brightness(0.2) saturate(23) hue-rotate(253deg)'
    }
    ,images:{
      model_fieldset_story_name_before:{
        url:'//d1x0rkxtisrwrz.cloudfront.net/next/assets/next/e6974165-release.png'
        ,w:'18'
        ,h:'15'
      }
    }
  }
};

const types=[
  {_name:'button_std'
    ,q:function(n){return '.'+n+' button.std';}
    ,css:'bg b'
    }
  ,{_name:'button_std_hover'
    ,q:function(n){return '.'+n+' button.std:hover';}
    ,css:'background-color:#000000;'
    }
  ,{_name:'editor_std'
    ,q:function(n){return '.'+n+' .editor.std';}
    ,css:'b'
    }
  ,{_name:'section_edit_maximize'
    ,q:function(n){return '.'+n+' section.edit .maximize';}
    ,css:'b bg'
    }
  ,{_name:'section_edit_maximize_hover'
    ,q:function(n){return '.'+n+' section.edit .maximize:hover';}
    ,css:'b'
    }
  ,{_name:'section_edit_maximize_before'
    ,q:function(n){return '.'+n+' section.edit .maximize:before';}
    ,css:function(n){return 'filter:'+clr[n].filters[this._name]+';';}
    }
  ,{_name:'flyover_header_title_maximize_button'
    ,q:function(n){return '.flyover.story_flyover .'+n+' header .title .maximize_button, .flyover.epic_flyover .'+n+' header .title .maximize_button';}
    ,css:'b bg'
    }
  ,{_name:'flyover_header_title_maximize_button_hover'
    ,q:function(n){return '.flyover.story_flyover .'+n+' header .title .maximize_button:hover, .flyover.epic_flyover .'+n+' header .title .maximize_button:hover';}
    ,css:function(n){return 'background-color:#000000;'+n.clr('b');}
    }
  ,{_name:'flyover_header_title_maximize_button_before'
    ,q:function(n){return '.flyover.story_flyover .'+n+' header .title .maximize_button:before, .flyover.epic_flyover .'+n+' header .title .maximize_button:before';}
    ,css:function(n){return 'filter:'+clr[n].filters.section_edit_maximize_before+';';}
    }
  ,{_name:'section_model_details_actions_button'
    ,q:function(n){return '.'+n+' section.model_details .actions button';}
    ,css:'bg b'
    }
  ,{_name:'section_model_details_button_with_field_text_value'
    ,q:function(n){return '.'+n+' section.model_details .button_with_field .text_value';}
    ,css:'bg b c'
    }
  ,{_name:'renderedDescription'
    ,q:function(n){return '.'+n+' div[data-aid="renderedDescription"]';}
    ,css:'b'
    }
  ,{_name:'story_preview'
    ,q:function(n){return '.story.'+n+' .preview, section .'+n+'.item .preview';}
    ,css:'P'
    }
  ,{_name:'story_preview_hover'
    ,q:function(n){return '.story.'+n+' .preview:hover, section .'+n+'.item .preview:hover';}
    ,css:'PH'
    }
  ,{_name:'story_model_section_edit'
    ,q:function(n){return '.story.model.'+n+' section.edit, .model.'+n+' section.edit';}
    ,css:'E'
    }
  ,{_name:'preview_reveal_button'
    ,q:function(n){return '.'+n+' .preview .reveal.button';}
    ,css:'bg b'
    }
  ,{_name:'preview_reveal_button_hover'
    ,q:function(n){return '.'+n+' .preview .reveal.button:hover';}
    ,css:function(n){return 'background-color:#000000;'+n.clr('b');}
    }
  ,{_name:'info_box'
    ,q:function(n){return '.'+n+' .info_box';}
    ,css:'b'
    }
  ,{_name:'info_box_row_label_wrapper'
    ,q:function(n){return '.'+n+' .info_box .row.label_wrapper';}
    ,css:'bb'
    }
  ,{_name:'info_box_row_row'
    ,q:function(n){return '.'+n+' .info_box .row+.row';}
    ,css:'bt'
    }
  ,{_name:'info_box_followers_wrapper_row'
    ,q:function(n){return '.'+n+' .info_box .followers_wrapper .row';}
    ,css:'bt'
    }
  ,{_name:'info_box_row_timestamp_wrapper'
    ,q:function(n){return '.'+n+' .info_box .row.timestamp_wrapper';}
    ,css:'bt bg'
    }
  ,{_name:'info_box_row_initials'
    ,q:function(n){return '.'+n+' .info_box .row .initials';}
    ,css:'bg b c'
    }
  ,{_name:'info_box_row_initials_hover'
    ,q:function(n){return '.'+n+' .info_box .row .initials:hover';}
    ,css:function(n){return 'background-color:#000000;'+(n.clr('b c'));}
    }
  ,{_name:'info_box_row_owner_a_add_owner'
    ,q:function(n){return '.'+n+' .info_box .row.owner a.add_owner';}
    ,css:'b'
    }
  ,{_name:'story_story_name'
    ,q:function(n){return '.story.'+n+' .story_name, .'+n+' .preview .epic_name';}
    ,css:'N'
    }
  ,{_name:'story_preview_hover_story_name'
    ,q:function(n){return '.story.'+n+' .preview:hover .story_name, .'+n+' .preview:hover .epic_name';}
    ,css:'NH'
    }
  ,{_name:'StoryLabelsMaker_container'
    ,q:function(n){return '.'+n+' .StoryLabelsMaker__container___3EAb3C9T';}
    ,css:'b'
    }
  ,{_name:'TaskEdit'
    ,q:function(n){return '.'+n+' .TaskEdit___1Xmiy6lz';}
    ,css:'b'
    }
  ,{_name:'TaskEdit_description'
    ,q:function(n){return '.'+n+' .TaskEdit__description___2HWb7Rhx';}
    ,css:'b'
    }
  ,{_name:'TaskShow'
    ,q:function(n){return '.'+n+' .TaskShow___2LNLUMGe';}
    ,css:'b'
    }
  ,{_name:'CommentEdit'
    ,q:function(n){return '.'+n+' .CommentEdit___3nWNXIac';}
    ,css:'b'
    }
  ,{_name:'CommentEdit_add_comment'
    ,q:function(n){return '.'+n+' .CommentEdit__add-comment___2chBxqcu';}
    ,css:'bg b'
    }
  ,{_name:'CommentEdit_add_comment_hover'
    ,q:function(n){return '.'+n+' .CommentEdit__add-comment___2chBxqcu:hover:not(:disabled)';}
    ,css:function(n){return 'background-color:#000000;'+(n.clr('b'));}
    }
  ,{_name:'DescriptionEdit_editor'
    ,q:function(n){return '.'+n+' .DescriptionEdit___1FO6wKeX .editor___1qKjhI5c';}
    ,css:'b'
    }
  ,{_name:'IconButton_small_not_borderless'
    ,q:function(n){return '.'+n+' .IconButton___2y4Scyq6:not(.IconButton--borderless___1t-CE8H2)';}
    ,css:'bg b'
    }
  ,{_name:'CommentEdit_initials'
    ,q:function(n){return '.'+n+' .CommentEdit__initials___149LoK2_';}
    ,css:function(n){return 'background-color:#000000;'+(n.clr('b'));}
    }
  ,{_name:'MentionableTextArea_textarea'
    ,q:function(n){return '.'+n+' .MentionableTextArea__textarea___2WDXl0X6';}
    ,css:'b'
    }
  ,{_name:'model_preview_expander_before'
    ,q:function(n){return '.model.'+n+' .preview .expander:before';}
    ,css:function(n){return 'filter:'+clr[n].filters[this._name]+';';}
    }
  ,{_name:'model_section_edit_fieldset_name_collapser'
    ,q:function(n){return '.model.'+n+' section.edit fieldset.name .collapser';}
    ,css:function(n){return 'filter:'+clr[n].filters[this._name]+';';}
    }
  ,{_name:'model_fieldset_story_name_before'
    ,q:function(n){return '.model.'+n+' fieldset.story.name:before';}
    ,css:function(n){ if(n==='epic'){return '';} return 'content: "";margin-left:-1px;margin-top:1px;float: left;margin-right: -'+clr[n].images[this._name].w+'px;height: '+clr[n].images[this._name].h+'px;width: '+clr[n].images[this._name].w+'px;background-size: '+clr[n].images[this._name].w+'px '+clr[n].images[this._name].h+'px;background-repeat: no-repeat;background-image: url('+clr[n].images[this._name].url+');';}
    }
  ,{_name:'meta_after'
    ,q:function(n){return '.'+n+'.comments .meta:after, .'+n+'.description .meta:after, .'+n+'.has_tasks .meta:after';}
    ,css:function(n){return 'filter:'+clr[n].filters[this._name]+';';}
    }
  ,{_name:'point_scale_meta'
    ,q:'.point_scale_fibonacci .meta, .flyover article.point_scale_fibonacci .meta'
    ,css:'xfilter:brightness(0.5) sepia(1) saturate(2) brightness(1.2) hue-rotate(10deg);'
    }
  ,{_name:'flyover_header_title'
    ,q:function(n){return '.flyover .'+n+' header .title';}
    ,css:function(n){return 'background:linear-gradient(to right,#000000,'+clr[n].bg+');';}
    }
  ,{_name:'flyover_header_title+h3'
    ,q:function(n){return '.flyover .'+n+' header .title h3';}
    ,css:'c'
    }

];
//
//,css:'background:linear-gradient(to bottom,rgba(0,0,0,0.0) 50%,#333300);border-left:2px solid #444400;border-right:2px solid #444400;'

//String.prototype.clr=
Object.defineProperty(String.prototype,'clr',{
  get: function(){
    const that=this;
    return function (items){
      // c, bg, b, bt,bl,br;
      const a=items.split(' ');
      const me=that.toString();
      const m={
        c:'color'
        ,bg:'background-color'
        ,b:'border'
        ,bt:'border-top'
        ,bb:'border-bottom'
        ,br:'border-right'
        ,bl:'border-left'
      };
      let s='';
      const o=clr[me];
      if (o===undefined) {
        console.error(me+' is not found in clr');
        return '';
      }
      if (a.length===1&&a[0]==='P') {
        s+='background:linear-gradient(to bottom, rgba(0,0,0,0) 50%, '+o.bg+');';
        s+='border-left:2px solid '+o.b+';';
        s+='border-right:2px solid '+o.b+';';
        s+='border-top:1px solid #000000;';
        s+='border-bottom:1px solid #000000;';
        return s;
      }
      if (a.length===1&&a[0]==='PH') {
        //noinspection JSUnresolvedFunction
        const bg=tinycolor(o.bg).lighten(20).toHexString();
        //noinspection JSUnresolvedFunction
        const b=tinycolor(o.b).lighten(20).toHexString();
        s+='background:linear-gradient(to bottom, #000000 50%, '+bg+');';
        s+='border-left:2px solid '+b+';';
        s+='border-right:2px solid '+b+';';
        return s;
      }
      if (a.length===1&&a[0]==='E') {
        //noinspection JSUnresolvedFunction
        const bg=tinycolor(o.bg).saturate(20).toHexString();
        //noinspection JSUnresolvedFunction
        const b=tinycolor(o.b).toHexString();
        s+='background:linear-gradient(to bottom, '+bg+', #000000);';
        s+='box-shadow:inset 0 0 10px '+b+';';
        return s;
      }
      if (a.length===1&&a[0]==='N') {
        //noinspection JSUnresolvedFunction
        const c=tinycolor(o.c).toHexString();
        s+='color:'+c+';';
        return s;
      }
      if (a.length===1&&a[0]==='NH') {
        //noinspection JSUnresolvedFunction
        const c=tinycolor(o.c).lighten(5).toHexString();
        s+='color:'+c+';';
        return s;
      }
      for (let x=0;x<a.length;x++) {
        const kk=a[x];//key
        let k=kk;
        if (k==='b'||k==='bt'||k==='bl'||k==='br'||k==='bb') {
          k='b';
        }
        const v=o[k];//color value
        const n=m[kk];//css name
        if (k==='b') {
          s+=n+':1px solid '+v+';';
        }else{
          s+=n+':'+v+';';
        }
      }
      return s;
    };
  }
  ,set: function() { throw "Cannot set Read Only Property '"+n+"'"; }
  ,enumerable: true
  ,configurable: false
});
//alert('xxx'.clr('ok'));
Sass = window['Sass'];
window.__={
  _name:'__'
  ,set:{
    _name:'set'
    ,urls:[
      'https://www.pivotaltracker.com/n/projects/1997711'
      ,'https://www.pivotaltracker.com/n/projects/1999485'
      ,'https://www.pivotaltracker.com/n/projects/2000741'
      ]
    } //-set
  ,data:{
    _name:'data'
    ,showkeys:true
    } //-data
  ,style:{   //initFnList
    _name:'style'
    ,scrollbars:""+
      +"::-webkit-scrollbar              { background-color:#222; }"
      +"::-webkit-scrollbar-track:vertical { background-color:#0a0a0a;background:linear-gradient(to bottom,#0a0a0a,#000,#0a0a0a); }"
      +"::-webkit-scrollbar-track-piece  { background-color:#000; }"
      +"::-webkit-scrollbar-track-piece:vertical { background-color:#0a0a0a;background:linear-gradient(to bottom,#0a0a0a,#000,#0a0a0a); }"
      +"::-webkit-scrollbar-track-piece:vertical:hover { background-color:#112;background:linear-gradient(to bottom,#112,#000,#112); }"
      +"::-webkit-scrollbar-track-piece:horizontal { background-color:#0a0a0a;background:linear-gradient(to right,#0a0a0a,#000,#0a0a0a); }"
      +"::-webkit-scrollbar-track-piece:horizontal:hover { background-color:#112;background:linear-gradient(to right,#112,#000,#112); }"
      +"::-webkit-scrollbar-button:vertical,"
      +"::-webkit-scrollbar-thumb:vertical        { background-color:#111;background:linear-gradient(to right,#000,#111,#000);}"
      +"::-webkit-scrollbar-button:vertical:hover,"
      +"::-webkit-scrollbar-thumb:vertical:hover  { background-color:#334;background:linear-gradient(to right,#222,#334,#222);}"
      +"::-webkit-scrollbar-button:horizontal,"
      +"::-webkit-scrollbar-thumb:horizontal      { background-color:#111;background:linear-gradient(to bottom,#000,#111,#000)}"
      +"::-webkit-scrollbar-button:horizontal:hover,"
      +"::-webkit-scrollbar-thumb:horizontal:hover{ background-color:#334;background:linear-gradient(to bottom,#222,#334,#222)}"
      +"::-webkit-scrollbar-corner       { background-color:#000; }"
      +"::-webkit-resizer                { background-color:#000; }"
    ,sass:function(){
      let s='';
      s+='$back-color:#000000;';
      s+='$back-color1:#111111;';
      s+='$font-color:#888888;';
      s+='$bord-color:#444444;';
      s+='';
      s+='';
      s+='input{';
      s+='background-color:$back-color;';
      s+='color:$font-color;';
      s+='}';
      s+='';
      s+='.tc_page_header_version-ia{';
      s+='  background-color:$back-color1;';
      s+='}';
      s+='';
      s+='.panel .container{';
      s+='  background-color:$back-color;';
      s+='}';
      s+='';
      s+='.editor .std{';
      s+='background-color:$back-color;';
      s+='color:$font-color;';
      s+='border:1px solid $bord-color;';
      s+='}';
      s+='';

      return s;
      }
    ,_fillTypes:function(n){
      for (let x=0;x<types.length;x++) {
        const t=types[x];
        let n1=t._name;
        if (typeof t._name==='function') {
          n1=t._name(n);
        }
        const name=n1+'__'+n;
        let q=t.q;
        if (typeof q==='function') {
          q=t.q(n);
        }
        let css=t.css;
        if (typeof css==='function') {
          css=t.css(n);
        }
        //noinspection UnnecessaryLocalVariableJS
        const o={
          _name:name
          ,q:q
          ,css:css
        };
        __.ui.styles[name]=o;
      }
      }
    ,_writeStyle:function(){ //style.
      let s = '';
      const NL = "\n";
      const styles = __.ui.styles;
      function getClr(i){
        if (i.indexOf('__')!==-1) {
          const a=i.split('__');
          return a[a.length-1];
        }
      }
      for (const i in styles) {
        //console.log(i);
        if (!styles.hasOwnProperty(i)) {
          continue;
        }
        const o = styles[i];
        if (typeof o!=='object') {
          continue;
        }
        if (o.css) {
          let css=o.css;
          const sc=css.indexOf(';')!==-1;
          const clr=getClr(i);
          if (!sc&&clr) {
            css=clr.clr(css);
          }
          if (o.nameIt) {
            const oo = o.q.q;
            oo.attr('id',i);
            s+='#'+i+'{'+NL;
            s+=''+css+NL;
            s+=''+'}'+NL;
          }else{
            s+=''+o.q+'{'+NL;
            s+=''+css+NL;
            s+=''+'}'+NL;
          }
        }
      }
      //console.log(s);
      if (1) {
        __.utils.updateNamedStyle(s,'dark');
      }else{
        const sass=this.sass();
        function wait(){
          //noinspection JSUnresolvedFunction
          if (!window.Sass) {
            console.log('wait window.Sass');
            setTimeout(wait,500);
            return;
          }
          // window.postMessage_old=window.postMessage;
          // window.postMessage=function(a,b){
          //   if (typeof b===undefined) {
          //     b='*';
          //   }
          //   return window.postMessage_old(a,b);
          // }
          //noinspection JSUnresolvedFunction
          Sass.compile(sass, function(result) {
            console.log("compiled", result.text);
            __.utils.updateNamedStyle(result.text,'dark');
            //window.postMessage=window.postMessage_old;
          });
        }
        wait();
      }
      } //-writeStyle
    ,_init_:function(){      //style.
      this._fillTypes('chore');
      this._fillTypes('feature');
      this._fillTypes('bug');
      this._fillTypes('release');
      this._fillTypes('epic');
      this._writeStyle();
      __.utils.updateNamedStyle(this.scrollbars,'scrollbars');
      } //-_init_
    ,_init:function(){       //style.
      this._init_();
      } //-_init
    } //-style
  ,libs:{    //initializableObjectContainer
    _name:'libs'
    ,StackTraceParser:{ //libs.
      _name:'StackTraceParser'
      ,UNKNOWN_FUNCTION : '<'+'unknown>' //libs.StackTraceParser
      ,parse: function(stackString) { //libs.StackTraceParser
        /**
         * This parses the different stack traces and puts them into one format
         * This borrows heavily from TraceKit (https://github.com/occ/TraceKit)
         */
        const chrome = /^\s*at (?:(?:(?:Anonymous function)?|((?:\[object object])?\S+(?: \[as \S+])?)) )?\(?((?:file|http|https):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
            gecko = /^(?:\s*(\S*)(?:\((.*?)\))?@)?((?:file|http|https).*?):(\d+)(?::(\d+))?\s*$/i,
            node  = /^\s*at (?:((?:\[object object])?\S+(?: \[as \S+])?) )?\(?(.*?):(\d+)(?::(\d+))?\)?\s*$/i,
            lines = stackString.split('\n'),
            stack = [];
         let parts,
            element;
        for (let i = 0, j = lines.length; i < j; ++i) {
          if ((parts = gecko.exec(lines[i]))) {
            element = {
              'file': parts[3],
              'methodName': parts[1] || this.UNKNOWN_FUNCTION,
              'lineNumber': +parts[4],
              'column': parts[5] ? +parts[5] : null
              };
          } else if ((parts = chrome.exec(lines[i]))) {
            element = {
              'file': parts[2],
              'methodName': parts[1] || this.UNKNOWN_FUNCTION,
              'lineNumber': +parts[3],
              'column': parts[4] ? +parts[4] : null
              };
          } else if ((parts = node.exec(lines[i]))) {
            element = {
              'file': parts[2],
              'methodName': parts[1] || this.UNKNOWN_FUNCTION,
              'lineNumber': +parts[3],
              'column': parts[4] ? +parts[4] : null
              };
          } else {
            continue;
          }
          stack.push(element);
        }
        return stack;
        } //-parse
      } //-StackTraceParser
    ,Radio:{            //libs.
      _name:'Radio'
      ,_init_:function(){ //libs.Radio
        if (this._initialized) {return;}
        this._initialized=true;
        (function(){ // radio
          "use strict";
          //console.log('radio');
            window.radio=radio;
            /**
             * Main Wrapper for radio.$ and create a function radio to accept the channelName
             * @param {String} channelName topic of event
             */
            function radio(channelName) {
              if (arguments.length) {
                radio.$.channel(channelName);
                return radio.$;
              }else{
                return radio.$;
              }
              //arguments.length ? radio.$.channel(channelName) : radio.$.reset();
            }
          radio.$ = {
            version: '0.2',
            channelName: "",
            channels: [],
              /**
               * Reset global state, by removing all channels
               * @example
               *    radio()
               */
              reset: function() {
                radio.$.channelName = "";
                radio.$.channels = [];
                },//-reset
              /**
               * Broadcast (publish)
               * Iterate through all listeners (callbacks) in current channel and pass arguments to subscribers
               * @param arguments data to be sent to listeners
               * @example
               *    //basic usage
               *    radio('channel1').broadcast('my message');
               *    //send an unlimited number of parameters
               *    radio('channel2').broadcast(param1, param2, param3 ... );
               */
              broadcast: function() {
                const c = this.channels[this.channelName],
                  l = c.length;
                let subscriber, callback, context;
                //iterate through current channel and run each subscriber
                for (let i = 0; i < l; i++) {
                  subscriber = c[i];
                  //if subscriber was an array, set the callback and context.
                  if ((typeof(subscriber) === 'object') && (subscriber.length)) {
                    callback = subscriber[0];
                    //if user set the context, set it to the context otherwise, it is a globally scoped function
                    context = subscriber[1] || global;
                  }
                  //noinspection JSUnresolvedFunction
                  callback.apply(context, arguments);
                }
                return this;
                },//-broadcast
              /**
               * Create the channel if it doesn't exist and set the current channel/event name
               * @param {String} name the name of the channel
               * @example
               *    radio('channel1');
               */
              channel: function(name) {
                const c = this.channels;
                //create a new channel if it doesn't exists
                if (!c[name]) c[name] = [];
                this.channelName = name;
                return this;
                },//-channel
              channelKeys:function (){
                //console.log('channelKeys');//+m.c.r
                return Object.keys(this.channels);
              },//-channelKeys
              /**
               * Add Subscriber to channel
               * Take the arguments and add it to the this.channels array.
               * @param {Function|Array} arguments list of callbacks or arrays[callback, context] separated by commas
               * @example
               *      //basic usage
               *      var callback = function() {};
               *      radio('channel1').subscribe(callback);
               *
               *      //subscribe an endless amount of callbacks
               *      radio('channel1').subscribe(callback, callback2, callback3 ...);
               *
               *      //adding callbacks with context
               *      radio('channel1').subscribe([callback, context],[callback1, context], callback3);
               *
               *      //subscribe by chaining
               *      radio('channel1').subscribe(callback).radio('channel2').subscribe(callback).subscribe(callback2);
               */
              subscribe: function() {
                const a = arguments,
                  c = this.channels[this.channelName],
                  l = a.length;
                //run through each arguments and subscribe it to the channel
                for (let i = 0; i < l; i++) {
                  const ai = a[i];
                  //if the user sent just a function, wrap the function in an array [function]
                  const p = (typeof(ai) === "function") ? [ai] : ai;
                  if ((typeof(p) === 'object') && (p.length)) c.push(p);
                }
                return this;
                },//-subscribe
              /**
               * Remove subscriber from channel
               * Take arguments with functions and unsubscribe it if there is a match against existing subscribers.
               * @param {Function} arguments callbacks separated by commas
               * @example
               *      //basic usage
               *      radio('channel1').unsubscribe(callback);
               *      //you can unsubscribe as many callbacks as you want
               *      radio('channel1').unsubscribe(callback, callback2, callback3 ...);
               *       //removing callbacks with context is the same
               *      radio('channel1').subscribe([callback, context]).unsubscribe(callback);
               */
              unsubscribe: function() {
                const a = arguments,
                  c = this.channels[this.channelName],
                  l = a.length;
                //loop through each argument
                for (let i = 0; i < l; i++) {
                  //need to reset vars that change as the channel array items are removed
                  let offset = 0;
                  const cl = c.length;
                  //loop through the channel
                  for (let j = 0; j < cl; j++) {
                    const jo = j - offset;
                    //if there is a match with the argument and the channel function, unsubscribe it from the channel array
                    if (c[jo][0] === a[i]) {
                      //unsubscribe matched item from the channel array
                      c.splice(jo, 1);
                      offset++;
                    }
                  }
                }
                return this;
                }//-unsubscribe
            };//-radio.%
          return radio;
          }());
        } //-_init_
      ,_init:function(){  //libs.Radio
        this._init_();
        } //-_init
      } //-Radio
    ,FontAwesome:{      //libs.
      _name:'FontAwesome'
      ,_init_:function(){ //libs.FontAwesome
        if (this._initialized) {return;}
        this._initialized=true;
        __.utils.addScript('https://use.fontawesome.com/09bc4b9f8f.js','fontawesome');
        } //-_init_
      ,_init:function(){ //libs.FontAwesome
        this._init_();
        } //-_init
      } //-FontAwesome
    ,_init_:function(){ //libs.
      __.utils.__initializer.bind(this)();
      } //-_init_
    ,_init:function(){  //libs.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      this._init_();
      } //-_init
    } //-libs
  ,utils:{   //functionContainer
    _name:'utils'
    ,itemXyWh:function(q){                            //utils.
      if (q.x!==undefined
        &&q.y!==undefined
        &&q.w!==undefined
        &&q.h!==undefined) {
        return q;
      }
      //noinspection JSValidateTypes
      const st = $(window).scrollTop();
      //noinspection JSValidateTypes
      const sl = $(window).scrollLeft();
      let w1=q.width();
      let h1=q.height();
      let x1,y1;
      if (q[0]===window) {
        x1=0;y1=0;
      }else{
        const b = q[0].getBoundingClientRect();
        x1=b.left;
        y1=b.top;
        w1=b.width;
        h1=b.height;
        if (0) {
          const offset1 = q.offset();
          if (offset1!==undefined) {
            x1=offset1.left-sl;
            y1=offset1.top-st;
          }else{
            //hack!
            x1=sl;y1=st;
          }
        }
      }
      return {x:x1,y:y1,w:w1,h:h1};
      } //-itemXyWh
    ,cas:function (e){                                //utils.
      let s = '';
      if (e.ctrlKey) {s += 'c';}
      if (e.altKey) {s += 'a';}
      if (e.shiftKey) {s += 's';}
      return s;
      } //-cas
    ,caso:function (e){                               //utils.
      let s = '';
      const o = {
        _: false
        , c: false
        , a: false
        , s: false
        , ca: false
        , cs: false
        , as: false
        , cas: false
      };
      if (e.ctrlKey) {s += 'c';}
      if (e.altKey) {s += 'a';}
      if (e.shiftKey) {s += 's';}
      if (s==='') {
        o._=true;
        return o;
      }
      if (s==='c') {
        o.c=true;
        return o;
      }
      if (s==='a') {
        o.a=true;
        return o;
      }
      if (s==='s') {
        o.s=true;
        return o;
      }
      if (s==='ca') {
        o.ca=true;
        return o;
      }
      if (s==='cs') {
        o.cs=true;
        return o;
      }
      if (s==='as') {
        o.as=true;
        return o;
      }
      if (s==='cas') {
        o.cas=true;
        return o;
      }
      } //-cas
    ,cancel:function(e){                              //utils.
      //console.log('keyProcessed');
      e.cancelBubble = true; // IE4+
      try {
        e.keyCode = 0;
      } catch (e) {

      } // IE5
      if (window.event) {e.returnValue = false; } // IE6
      if (e.preventDefault) {e.preventDefault(); } // moz/opera/konqueror
      if (e.stopPropagation) {e.stopPropagation(); } // all
      return false;
      } //-cancel
    ,delay:function(ms){                              //utils.
      ms += new Date().getTime();
      console.log('delaying '+ms);
      while (new Date() < ms){}
      console.log('delay released');
      } //-delay
    ,inheritFrom:function(obj,tgt) {                  //utils.
      //console.log('inheritFrom..........'+arguments.callee.caller.name);
      const a=[];
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          tgt[i]=obj[i];
          a[a.length]=i;
        }else{
          console.log('not inheriting "'+i+'" in '+obj.name);
        }
      }
      //console.log('inheritedFrom '+obj.name,a);
      } //-inheritedFrom
    ,perf:function(n){                                //utils.
      __.data.perfs=__.data.perfs===undefined?{}:__.data.perfs;
      if (__.data.perfs[n]===undefined) {
        //noinspection JSUnresolvedVariable
        __.data.perfs[n]=performance.now();
      }else{
        //noinspection JSUnresolvedVariable
        console.log('perf:'+n+' took '+(performance.now()-__.data.perfs[n])+' ms');
        delete __.data.perfs[n];
      }
      } //-perf
    ,eachNode:function(object,fn,wantTypes,re,_bag){  //utils.
      /*
       * Iterate object passing its members to fn, filtered by wantTypes and regular expression.
       *
       * Parameters:
       *   object: subject object
       *   fn:     callback - optional
       *     |
       *     signature: name,item,type,object,parent,depth,path,indexes
       *              |
       *              name:      the name of the member
       *              item:      the member
       *              type:      typeof member
       *              object:    in which member resides
       *              parent:    the parent of object
       *              depth:     zero based recursion depth
       *              path:      dot path of current object relative to passed object
       *              indexes:   object of indexes
       *                     |
                             itemIndex:    position item was found in containing object
                             itemDidIndex: index count of items done for containing object
                             didIndex:     global index count of items done for passed object
                             index:        global index count of items for passed object
       *   wantTypes: array of Javascript types, defaults to ['object'] - optional
       *   re:        regular expression to filter member names
       *   _bag:      internal, do not supply, but this it will be returned
       *
       * Returns:
       *   _bag: bag containing collections
       *       |
       *
       *
       *
       *
       */
      let itemIndex= -1, itemDidIndex=-1, name, item, rv,indexes, dupe, retItem;
      if (_bag===undefined){
        const bag = {
          index: -1
          , didIndex: -1
          , _parents: []
          , _paths: []
          , did: []
          , returns: { items: [], dupes: [] }
        };
        Object.defineProperty(bag,'depth',{
          get:function(){
            return this._parents.length;
          }
          ,set:function(){}
          ,enumerable:true,configurable: false
        });
        Object.defineProperty(bag,'parent',{
          get:function(){
            return this._parents.length>0?this._parents[this._parents.length-1]:undefined;
          }
          ,set:function(v){this._parents.push(v);}
          ,enumerable:true,configurable: false
          });
        Object.defineProperty(bag,'parents',{
          get:function(){
            const a=[];
            for(let x=0;x<this._parents.length;x++){
              a.push(this._parents[x]);
            }
            return a;
          }
          ,set:function(){}
          ,enumerable: true,configurable: false
        });
        Object.defineProperty(bag,'path',{
          get:function(){
            let p=this._paths.join('.');
            p=p===''?p:p+'.';
            return p+''+this._name;
            }
          ,set:function(){}
          ,enumerable: true,configurable: false
        });
        bag.push=function(){
          this._parents.push(this._object);
          this._paths.push(this._name);
          return __.utils.eachNode(this._item,fn,wantTypes,re,this);
        };
        bag.pop=function(rv){
          this._item=this._parents.pop();
          this._paths.pop();
          this._name=this._paths.length>0?this._paths[this._paths.length-1]:'';
          if (rv===null){this._breaking=true;}
          if (this.depth===0) {
            return this;
          }
          return rv;
        };
        bag.path=function(){
          let s='';
          for (let x=0;x<this._parents.length;x++){
            s+='.'+this._parents[x]._name;
          }
          return s;
        };
        _bag=bag;
      } // if no bag
      //noinspection JSUnusedLocalSymbols
      fn=fn!==undefined?fn:function(name,item,type,object,parent,depth,path,indexes){return true;};
      wantTypes=wantTypes?wantTypes:['object'];
      _bag._object=object;
      for(name in object){
        if(!object.hasOwnProperty(name)){continue;}
        item=object[name];
        _bag._name=name;
        _bag._item=item;
        itemIndex++;
        _bag.index++;
        const type = typeof item;
        if (['function','object'].indexOf(type)!==-1&&item!==null){
          if (_bag.did.indexOf(item)!==-1){
            indexes={
              itemIndex:itemIndex
              ,itemDidIndex:itemDidIndex
              ,didIndex:_bag.didIndex
              ,index:_bag.index
              };
            dupe={
              item:item
              ,name:name
              ,object:object
              ,type:type
              ,parent:_bag.parent
              ,depth:_bag.depth
              ,path:_bag.path
              ,indexes:indexes
              };
            _bag.returns.dupes.push(dupe);
            continue;
          }else{
            _bag.did.push(item);
          }
        }
        if(wantTypes.indexOf(type)!==-1){
          const doit = re === undefined ? true : re.test(name);
          if (doit){
            itemDidIndex++;
            _bag.didIndex++;
            // undefined: no push, true: push, false: no push, -1: no push, 'done':abort level, 'finish': abort all
            indexes={
              itemIndex:itemIndex
              ,itemDidIndex:itemDidIndex
              ,didIndex:_bag.didIndex
              ,index:_bag.index
              };
            rv=fn(name,item,type,object,_bag.parent,_bag.depth,_bag.path,indexes);
            //noinspection ConstantIfStatementJS
            if (false){
            }else if (rv==='done'){
              break;
            }else if (rv==='finish'){
              return _bag.pop(null);
            }else if (rv){ // '==' is OK here
              indexes={
                itemIndex:itemIndex
                ,itemDidIndex:itemDidIndex
                ,didIndex:_bag.didIndex
                ,index:_bag.index
                };
              retItem={
                name:name
                ,item:item
                ,object:object
                ,type:type
                ,parent:_bag.parent
                ,depth:_bag.depth
                ,path:_bag.path
                ,indexes:indexes
                };
              _bag.returns.items.push(retItem);
            }else if (!rv||rv===-1||rv===undefined){
              // nada
            }
          }
        } // not want type
        if (type==='object'&&item!==null){
          rv=_bag.push();
          if(rv===null){
            return _bag.pop(rv);
          }
        }
        if (_bag._breaking){
          break;
        }
      }
      return _bag.pop();
      } //-eachNode
    ,blackHtml:function(){                            //utils.
      const color = document.documentElement.style.backgroundColor;
      document.documentElement.style.backgroundColor = "black";
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (false && mutation.target.nodeName === "BODY") {
            observer.disconnect();
            document.documentElement.style.backgroundColor = color || "";
          }
        });
      });
      //noinspection JSCheckFunctionSignatures
      observer.observe(document, { childList: true, subtree: true });
      } //-blackHtml
    ,addStylesheet:function(url,id){                  //utils.
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      //noinspection JSUnresolvedFunction, JSUnresolvedVariable,ES6ModulesDependencies
      style.href = chrome&&chrome.extension?chrome.extension.getURL(url):url;
      if (id) {
        style.id=id;
      }
      (document.head||document.documentElement).appendChild(style);
      } //-addStylesheet
    ,addScript:function(url,id){                      //utils.
      const el = document.createElement('script');
      el.type = 'text/javascript';
      //noinspection JSUnresolvedFunction, JSUnresolvedVariable,ES6ModulesDependencies
      el.src=chrome&&chrome.extension?chrome.extension.getURL(url):url;
      if (id) {
        el.id=id;
      }
      (document.head||document.documentElement).appendChild(el);
      } //-addScript
    ,deleteNamedStyle:function(name_) {               //utils.
      __.data.namedStyles=__.data.namedStyles?__.data.namedStyles:[];
      const i = __.data.namedStyles.indexOf(name_);
      if (i!==-1) {
        __.data.namedStyles=__.data.namedStyles.splice(i,1);
        const qo=$('#'+name_);
        if (qo.length===1) {
          qo.remove();
        }else{
          if (qo.length>1) {
            console.error('multiple element matches for named style:'+name_);
            qo.remove();
          }else{
            console.error('zero element matches for named style:'+name_);
          }
        }
      }else{
        console.warn('named style not found:'+name_);
      }
      } //-deleteNamedStyle
    ,updateNamedStyle:function(style_str_,name_,fn) { //utils.
      if (name_===undefined) {
        name_='defaultStyle';
      }
      __.data.namedStyles=__.data.namedStyles?__.data.namedStyles:[];
      if (__.data.namedStyles.indexOf(name_)===-1) {
        __.data.namedStyles.push(name_);
      }
      const st=document.getElementById(name_);
      if (st!==null) {
        //st=st[0];
        st.innerHTML=style_str_;
      }else{
        const head = document.getElementsByTagName("HEAD")[0];
        const ele = head.appendChild(window.document.createElement( 'style' ));
        const q=$(ele);
        q.attr('id',name_);
        q.attr('type','text/css');
        if (fn!==undefined) {
          q.on('load',fn);
        }
        ele.innerHTML = style_str_;
      }
      } //-updateNamedStyle
    ,addScripting:function(s,id){                     //utils.
      const script = document.createElement("script");
      // Add script content
      script.innerHTML = s;
      if (id!==undefined) {
        script.id=id;
      }
      // Append
      document.head.appendChild(script);
      } //-addScripting
    ,addScriptingFn:function(fn){                     //utils.
      let s='';
      s+='('+fn+')();';
      this.addScripting(s);
      } //-addScriptingFn
    ,qOf:function(q){                                 //utils.
      //noinspection ConstantIfStatementJS
      if (false) {
      }else if (typeof q==='function') {return q();
      }else if (q instanceof jQuery) {return q;
      }else if (typeof q==='string') {return q.q;
      }else if (typeof q==='object') {
        return q;
      }
      } //-q
    ,isInDocument:function(el) {                      //utils.
      const html = document.body.parentNode;
      while (el) {
        if (el === html) {
          return true;
        }
        el = el.parentNode;
      }
      return false;
      } //-isInDocument
    ,body_msg:function(s){                            //utils.
      $('body').attr('data-msg',s);
      } //
    ,timeDifference:function(earlierDate,laterDate){  //utils.
      let tot = laterDate.getTime() - earlierDate.getTime();
      const o = {};
      o.days = Math.floor(tot/1000/60/60/24);
      tot -= o.days*1000*60*60*24;
      o.hours = Math.floor(tot/1000/60/60);
      tot -= o.hours*1000*60*60;
      o.minutes = Math.floor(tot/1000/60);
      tot -= o.minutes*1000*60;
      o.seconds = Math.floor(tot/1000);
      return o;
      }
    ,findDirection:function(me,all,dir,xtol,ytol){    //utils.
      xtol=xtol===undefined?5:xtol;
      ytol=ytol===undefined?5:ytol;
      me=typeof me==='string'?me.q:me;
      all=typeof all==='string'?all.q:all;
      const res=[];
      all.each(function(){
        const vv=$(this);
        res.push({r:this.getBoundingClientRect(),q:vv});
      });
      function center(r){
        const x=r.left+r.width/2;
        const y=r.top+r.height/2;
        return {x:x,y:y};
      }
      function dist(r1,r2){
        const cp1=center(r1);
        const cp2=center(r2);
        const xx=Math.abs(cp1.x-cp2.x);
        const yy=Math.abs(cp1.y-cp2.y);
        //noinspection UnnecessaryLocalVariableJS
        const rv=Math.sqrt(xx*xx+yy*yy);
        return rv;
      }
      function xyc(r1,r2){
        const cp1=center(r1);
        const cp2=center(r2);
        const rv={};
        rv.x=cp2.x-cp1.x;
        rv.y=cp2.y-cp1.y;
        return rv;
      }
      const r=me.get(0).getBoundingClientRect();
      //var cp=center(r);
      // dist xc yc
      res.forEach(function(v){
        v.dist=dist(r,v.r);
        v.xyc=xyc(r,v.r);
      });
      let cur = null;
      function putcur(v,max){
        if (cur===null) {
          cur=v;
          return;
        }
        max=max===undefined?false:max;
        if (!max) {
          if (v.dist<cur.dist) {cur=v;}
        }else{
          if (v.dist>cur.dist) {cur=v;}
        }
      }
      res.forEach(function(v){
        if (v.q.get(0)===me.get(0)) {
          return;
        }
        //noinspection ConstantIfStatementJS
        if (false) {
        }else if (dir==='left') {
          if (v.xyc.y>ytol||v.xyc.y<-ytol) {return;}
          if (v.xyc.x>=0) {return;}
          putcur(v);
        }else if (dir==='right') {
          if (v.xyc.y>ytol||v.xyc.y<-ytol) {return;}
          if (v.xyc.x<=0) {return;}
          putcur(v);
        }else if (dir==='up') {
          if (v.xyc.x>xtol||v.xyc.x<-xtol) {return;}
          if (v.xyc.y>=0) {return;}
          putcur(v);
        }else if (dir==='down') {
          if (v.xyc.x>xtol||v.xyc.x<-xtol) {return;}
          if (v.xyc.y<=0) {return;}
          putcur(v);
        }else if (dir==='home') {
          if (v.xyc.y>ytol||v.xyc.y<-ytol) {return;}
          if (v.xyc.x>=0) {return;}
          putcur(v,true);
        }else if (dir==='end') {
          if (v.xyc.y>ytol||v.xyc.y<-ytol) {return;}
          if (v.xyc.x<=0) {return;}
          putcur(v,true);
        }else if (dir==='pgup') {
          if (v.xyc.x>xtol||v.xyc.x<-xtol) {return;}
          if (v.xyc.y>=0) {return;}
          putcur(v,true);
        }else if (dir==='pgdn') {
          if (v.xyc.x>xtol||v.xyc.x<-xtol) {return;}
          if (v.xyc.y<=0) {return;}
          putcur(v,true);
        }
      });
      if (cur===null) {
        return me;
      }
      return cur.q;
      }
    ,parseQueryString:function(queryString) {         //utils.
      const query = {};
      const a = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
      for (let i = 0; i < a.length; i++) {
        const b = a[i].split('=');
        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
      }
      return query;
      }
    ,defunction:function(val){                        //utils.
      if ('function'===typeof val) {
        return val();
      }
      return val;
      } //-defunction
    ,messageTop:function(msg){                        //utils.
      //noinspection JSUnresolvedFunction
      window.top.postMessage(msg,'*');
      } //-messageTop
    ,clickElementRelative:function(q,x,y){
      const el=q.get(0);
      const r=el.getBoundingClientRect();
      const xx=parseInt(r.left+x);
      const yy=parseInt(r.top+y);
      const clickEvent= document.createEvent('MouseEvents');
      //noinspection JSDeprecatedSymbols
      clickEvent.initMouseEvent(
      'click', true, true, window, 0,
      0, 0, xx, yy, false, false,
      false, false, 0, null
      );
      el.dispatchEvent(clickEvent);
      } //-clickElementRelative
    ,__initializer:function(){                        //utils.
      // usage: __.utils.__initializer.bind(this)(); at _init_ top
      // call this.??_init functions
      // call this.<object>_init functions
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init_');}
      for (const i in this) {
        if (!this.hasOwnProperty(i)) {
          continue;
        }
        //noinspection ConstantIfStatementJS
        if (false) {
        }else if (typeof this[i]==='function') {
          if (/^.+_init$/.test(i)) {
            this[i]();
          }
        }else if (typeof this[i]==='object') {
          if (typeof this[i]._init==='function') {
            this[i]._init();
          }
        }
      }
      } //-__initializer
    } //-utils
  ,state:{   //initializableObjectsAndFunctionContainer
    _name:'state'
    ,inEditor:function(){
      let q=':focus'.q;
      const tn=q.prop('tagName');
      if (['INPUT','TEXTAREA'].indexOf(tn)!==-1) {
        return true;
      }
      q='div.mce-tinymce'.q;
      return q.length > 0 && q.is(':visible');
      } //-inEditor
    ,isViewLoading:function(){       //state.
      return $(__.ui.parts.VIEW.q).length===0;
      } //-isViewLoading
    ,isViewLoaded:function(){        //state.
      return !this.isViewLoading();
      } //-isViewLoading
    ,isTop:function(){               //state.
      //return false;
      return window===top;
      } //-isTop
    ,isGoodUrl:function(){
      for (let x=0;x<__.set.urls.length;x++) {
        //console.log(window.location.origin+window.location.pathname,__.set.urls[x]);
        if ((window.location.origin+window.location.pathname).indexOf(__.set.urls[x])!==-1) {
          return true;
        }
      }
      return false;//__.set.urls.indexOf(window.location.origin+window.location.pathname)!==-1;
      }
    ,_init_:function(){              //state.
      __.utils.__initializer.bind(this)();
      // nada
      } //-_init_
    ,_init:function(){               //state.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      this._init_();
      } //-_init
    } //-state
  ,actions:{ //functionContainer
    _name:'actions'
    } //-actions
  ,hooks:{   //initializableObjectsContainer
    _name:'hooks'
    ,mouseHooks:{                    //hooks.
      _name:'mouseHooks'
      ,_init_:function(){
        //body.on mousemove
        $(document).mousemove(function(evt){
          __.data.mmx=evt.pageX;
          __.data.mmy=evt.pageY;
          //__.events.doc.mousemove(evt);
          //console.info('evt.pageX:',evt.pageX,'evt.pageY',evt.pageY);
        });
        } //-_init_
      ,_init:function(){
        this._init_();
        }
      } //-mouseHooks
    ,hashChangeHooks:{               //hooks.
      _name:'hashChangeHooks'
      ,_init_:function(){ //hooks.hashChangeHooks
        __.data.oldHash=window.location.hash;
        $(window).bind('hashchange',function(){
          __.events.win.hashChange();
          __.data.oldHash=window.location.hash;
        });
        } //-_init_
      ,_init:function(){ //hooks.hashChangeHooks
        this._init_();
        } //-_init
      } //-hashChangeHooks
    ,messageHooks:{                  //hooks.
      _name:'messageHooks'
      ,_init_:function(){ //hooks.messageHooks
        //console.log('INIT',this._name);
        window.addEventListener("message", function(e){
          __.events.win.message(e);
        }, false);
        __.utils.messageTop({from:window.name,action:'listening'});
        } //-_init_
      ,_init:function(){ //hooks.messageHooks
        this._init_();
        } //-_init
      } //-messageHooks
    ,kbdHooks:{                      //hooks.
      _name:'kbdHooks'
      ,_init_:function(){ //hooks.kbdHooks
        $(document).on("keyup",function(e){return __.events.doc.keyup(e);});
        $(document).on("keydown",function(e){return __.events.doc.keydown(e);});
        $(document).on("keypress",function(e){return __.events.doc.keypress(e);});
        }
      ,_init:function(){ //hooks.kbdHooks
        this._init_();
        } //-_init
      } //-kbdHooks
    ,domHooks:{                      //hooks.
      _name:'domHooks'
      ,_init_:function(){ //hooks.domHooks
        $(document).bind('DOMNodeInserted', function(event) {
          __.events.dom.node_inserted(event);
        });
        $(document).bind('DOMNodeRemoved', function(event) {
          __.events.dom.node_removed(event);
        });
        } //-_init_
      ,_init:function(){ //hooks.domHooks
        this._init_();
        } //_init
      } //-domHooks
    ,winHooks:{                      //hooks.
      _name:'winHooks'
      ,_init_:function(){ //hooks.winHooks
        //noinspection JSUnresolvedFunction
        $(window).smartresize(__.events.win.resize);
        } //-_init_
      ,_init:function(){ //hooks.winHooks
        this._init_();
        } //-_init
      } //-winHooks
    ,timeHooks:{                     //hooks.
      _name:'time'
      ,_init_:function(){ //hooks.timeHooks
        if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
        } //-_init_
      ,_init:function(){ //hooks.timeHooks
        if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
        } //-_init
      }
    ,_init_:function(){              //hooks.
      __.utils.__initializer.bind(this)();
      } //-_init_
    ,_init:function(){               //hooks.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      this._init_();
      } //-init
    } //-hooks
  ,ui:{      //initializableObjectsAndFunctionContainer
    _name:'ui'
    ,styles:{
      _name:'styles'
      ,a_link:{
        _name:'a_link'
        ,q:'a:link'
        ,css:'color:#667799;'
        }
      ,input:{
        _name:'input'
        ,q:'input'
        ,css:'background-color:#000000;color:#888888;'
        }
      ,button_std:{
        _name:'button_std'
        ,q:'button.std'
        ,css:'box-shadow:2px 2px 2px #000000;'
        }
      ,button_std_hover:{
        _name:'button_std_hover'
        ,q:'button.std:hover'
        ,css:'background-color:#000000;'
        }
      ,page_header_version:{
        _name:'page_header_version'
        ,q:'.tc_page_header_version-ia'
        ,css:'background-color:#111111;'
        }
      ,panel_container:{
        _name:'panel_container'
        ,q:'.panel .container'
        ,css:'background-color:#000000;'
        }
      ,editor_std:{
        _name:'editor_std'
        ,q:'.editor.std'
        ,css:'background-color:#000000;color:#888888;border: 1px solid #444444;'
        }
      ,main_project:{
        _name:'main_project'
        ,q:'.main.project'
        ,css:'linear-gradient(to bottom,#111111,#000000);'
        }
      ,panel_labels_menu_dropdown:{
        _name:'panel_labels_menu_dropdown'
        ,q:'.panel.labels menu.dropdown'
        ,css:'background-color:transparent;'
        }
      ,tn_panel_items_container:{
        _name:'tn_panel_items_container'
        ,q:'.tn-panel-items-container___1Fk42hjC'
        ,css:'overflow-y:scroll;'
        }
      ,section_edit_maximize:{
        _name:'section_edit_maximize'
        ,q:'section.edit .maximize'
        ,css:'background-color: #222222;border: 1px solid #444444;box-shadow:2px 2px 2px #000000;'
        }
      ,section_edit_maximize_hover:{
        _name:'section_edit_maximize_hover'
        ,q:'section.edit .maximize:hover'
        ,css:'background-color: #000000;border: 1px solid #444444;'
        }
      ,renderedDescription:{
        _name:'renderedDescription'
        ,q:'div[data-aid="renderedDescription"]'
        ,css:'background-color:#000000;color:#888888;border:1px solid #444444;'
        }
      ,descriptionEditButton:{
        _name:'descriptionEditButton'
        ,q:'.Description___3oUx83yQ .edit___2HbkmNDA'
        ,css:'color:#666699'
        }
      ,dropdown_menu:{
        _name:'dropdown_menu'
        ,q:'.dropdown_menu'
        ,css:'background-color:#000000;color:#888888;border:1px solid #222222;'
        }
      ,dropdown_section_dropdown_menu_search_item:{
        _name:'dropdown_section_dropdown_menu_search_item'
        ,q:'.dropdown section .dropdown_menu .search_item'
        ,css:'background-color:#000000;'
        }
      ,dropdown_section_dropdown_menu_search_item_ul:{
        _name:'dropdown_section_dropdown_menu_search_item_ul'
        ,q:'.dropdown section .dropdown_menu .search_item~ul'
        ,css:'border-top:1px solid #111111;'
        }
      ,dropdown_section_dropdown_menu_search_no_results:{
        _name:'dropdown_section_dropdown_menu_search_no_results'
        ,q:'.dropdown section .dropdown_menu.search.no_results'
        ,css:'border:1px solid #444444;'
        }
      ,dropdown_menu_dropdown_item_hover:{
        _name:'dropdown_menu_dropdown_item_hover'
        ,q:'.dropdown_menu .dropdown_item.hover'
        ,css:'background-color:#001122;color:#445588;'
        }
      ,dropdown_menu_hover_dropdown_item_selected_a:{
        _name:'dropdown_menu_hover_dropdown_item_selected_a'
        ,q:'.dropdown_menu.hover .dropdown_item.selected a'
        ,css:'background-color:#001122;color:#445588;'
        }
      ,dropdown_menu_hover_dropdown_item_selected_hover_a:{
        _name:'dropdown_menu_hover_dropdown_item_selected_hover_a'
        ,q:'.dropdown_menu.hover .dropdown_item.hover.selected a'
        ,css:'background-color:#002233;color:#445588;'
        }
      ,dropdown_menu_dropdown_item_a:{
        _name:'dropdown_menu_dropdown_item_a'
        ,q:'.dropdown_menu .dropdown_item a'
        ,css:'color:#888888;'
        }
      ,dropdown_menu_dropdown_item_hover_a:{
        _name:'dropdown_menu_dropdown_item_hover_a'
        ,q:'.dropdown_menu .dropdown_item.hover a'
        ,css:'color:#445588;'
        }
      ,dropdown_menu_dropdown_item_selected_a:{
        _name:'dropdown_menu_dropdown_item_selected_a'
        ,q:'.dropdown_menu .dropdown_item.selected a'
        ,css:'background-color:#001122;color:#445588;'
        }
      ,DropdownMenu_menuList:{
        _name:'DropdownMenu_menuList'
        ,q:'._1VtS8__DropdownMenu__menuList'
        ,css:'background-color:#111111;color:888888;border-top:1px solid #222222;'
        }
      ,DropdownMenuOption:{
        _name:'DropdownMenuOption'
        ,q:'.Smnpz__DropdownMenuOption'
        ,css:'color:#888888;'
        }
      ,DropdownMenuOption_hover:{
        _name:'DropdownMenuOption_hover'
        ,q:'.Smnpz__DropdownMenuOption:hover'
        ,css:'background-color:#001122;color:#445588;'
        }
      ,info_box:{
        _name:'info_box'
        ,q:'.info_box'
        ,css:'background-color: rgba(0,0,0,0.6);border: 1px solid #444444;box-shadow: 3px 3px 3px #000000;'
        }

      ,info_box_row_focused:{
        _name:'info_box_row_focused'
        ,q:'.info_box .row.focused'
        ,css:'background-color:#000000;'
        }
      ,info_box_row_row:{
        _name:'info_box_row_row'
        ,q:'.info_box .row+.row'
        ,css:'border-top:1px solid #444444;'
        }
      ,info_box_followers_wrapper_row:{
        _name:'info_box_followers_wrapper_row'
        ,q:'.info_box .followers_wrapper .row'
        ,css:'border-top:1px solid #444444;'
        }
      ,info_box_integration_wrapper_row:{
        _name:'info_box_followers_wrapper_row'
        ,q:'.info_box .integration_wrapper .row'
        ,css:'border-top:1px solid #444444;'
        }
      ,info_box_row_timestamp_wrapper:{
        _name:'info_box_row_row'
        ,q:'.info_box .row.timestamp_wrapper'
        ,css:'border-top:1px solid #444444;background-color:#333333;'
        }
      ,info_box_row_em:{
        _name:'info_box_row_em'
        ,q:'.info_box .row>em'
        ,css:'color:#888888;text-shadow:0 1px 1px #000000;'
        }
      ,info_box_row_owner_story_owners_name:{
        _name:'info_box_row_owner_story_owners_name'
        ,q:'.info_box .row.owner .story_owners .name'
        ,css:'color:#888888;'
        }
      ,info_box_row_initials:{
        _name:'info_box_row_initials'
        ,q:'.info_box .row .initials'
        ,css:'border:1px solid #444444;'
        }
      ,info_box_row_requester_dropdown_description:{
        _name:'info_box_row_requester_dropdown_description'
        ,q:'.info_box .row.requester .dropdown_description'
        ,css:'border:1px solid #444444;'
        }
      ,info_box_row_owner_a_add_owner:{
        _name:'info_box_row_owner_a_add_owner'
        ,q:'.info_box .row.owner a.add_owner'
        ,css:'border-color:#444444;'
        }
      ,info_box_row_deadline_display:{
        _name:'info_box_row_deadline_display'
        ,q:'.info_box .row .deadline_display'
        ,css:'color:#aaaaaa;'
        }
      ,info_box_row_following_input_type_checkbox:{
        _name:'info_box_row_following_input_type_checkbox'
        ,q:'.info_box .row.following input[type=checkbox]'
        ,css:'filter:invert(1);'
        }
      ,lightbox_lightbox_owner_initials:{
        _name:'lightbox_lightbox_owner_initials'
        ,q:'.lightbox .lightbox.owner .initials'
        ,css:'border:1px solid #444444;'
        }
      ,dropdown_selection:{
        _name:'dropdown_selection'
        ,q:'.dropdown .selection'
        ,css:'color:#999999;'
        }
      ,model_section_edit_h4:{
        _name:'model_section_edit_h4'
        ,q:'.model section.edit h4'
        ,css:'color:#888888;'
        }
      ,timestamp_timestamp_row:{
        _name:'timestamp_timestamp_row'
        ,q:'.timestamp .timestamp_row'
        ,css:'color:#888888;text-shadow:0 1px 1px #000000;'
        }
      ,section_model_details_actions_button:{
        _name:'section_model_details_actions_button'
        ,q:'section.model_details .actions button'
        ,css:'background-color:#222222;border: 1px solid #444444;box-shadow:2px 2px 2px #000000;'
        }
      ,section_model_details_actions_button_before:{
        _name:'section_model_details_actions_button_before'
        ,q:'section.model_details .actions button:before'
        ,css:'filter:invert(1);'
        }
      ,section_model_details_actions_button_hover:{
        _name:'section_model_details_actions_button_hover'
        ,q:'section.model_details .actions button.hover, section.model_details .actions button.hoverable:hover'
        ,css:'background-color:#000000;'
        }
      ,section_model_details_button_with_field_text_value:{
        _name:'section_model_details_button_with_field_text_value'
        ,q:'section.model_details .button_with_field .text_value'
        ,css:'background-color:#222222;border: 1px solid #444444;color:#888888;box-shadow:2px 2px 2px #000000;'
        }

      ,section_story_item_preview:{
        _name:'section_story_item_preview'
        ,q:'section .story.item .preview'
        ,css:'border-bottom: 1px solid transparent;border-top: 1px solid #000000;padding-top: 2px;'
        }

      ,model_section_edit_fieldset_name_textarea_editor:{
        _name:'model_section_edit_fieldset_name_textarea_editor'
        ,q:'.model section.edit fieldset.name textarea.editor'
        ,css:'margin-left: 20px;width:calc(100% - 20px);'
        }






      ,story_model_story_name:{
        _name:'story_model_story_name'
        ,q:'.story.model .story_name'
        ,css:'text-shadow:1px 1px 1px #000000;'
        }




      ,preview_selector:{
        _name:'preview_selector'
        ,q:'.preview .selector'
        ,css:'border-left:1px dotted #444444;'
        }
      ,preview_selector_accepted:{
        _name:'preview_selector_accepted'
        ,q:'.accepted .preview .selector'
        ,css:'border-left:8px solid '+clr.status.accepted+';'
        }
      ,preview_selector_unscheduled:{
        _name:'preview_selector_unscheduled'
        ,q:'.unscheduled .preview .selector'
        ,css:'border-left:8px solid '+clr.status.unscheduled+';'
        }
      ,preview_selector_unstarted:{
        _name:'preview_selector_unstarted'
        ,q:'.unstarted .preview .selector'
        ,css:'border-left:8px solid '+clr.status.unstarted+';'
        }
      ,preview_selector_started:{
        _name:'preview_selector_started'
        ,q:'.started .preview .selector'
        ,css:'border-left:8px solid '+clr.status.started+';'
        }
      ,preview_selector_finished:{
        _name:'preview_selector_finished'
        ,q:'.finished .preview .selector'
        ,css:'border-left:8px solid '+clr.status.finished+';'
        }
      ,preview_selector_delivered:{
        _name:'preview_selector_delivered'
        ,q:'.delivered .preview .selector'
        ,css:'border-left:8px solid '+clr.status.delivered+';'
        }
      ,preview_selector_rejected:{
        _name:'preview_selector_rejected'
        ,q:'.rejected .preview .selector'
        ,css:'border-left:8px solid '+clr.status.rejected+';'
        }

      ,preview_selector_before:{
        _name:'preview_selector_before'
        ,q:'.preview .selector:before'
        ,css:'filter:invert(1);'
        }
      ,meta:{
        _name:'meta'
        ,q:'.meta'
        ,css:'xbackground-color:rgba(0, 0, 0, 0.34);width:36px;'
        }
      ,meta_before:{
        _name:'meta_before'
        ,q:'.meta:before'
        ,css:'xbackground-color:rgba(0, 0, 0, 0.34);'
        }

      ,release_meta_before:{// special
        _name:'release_meta_before'
        ,q:'.flyover article.release .meta:before, .story.release .meta:before'
        ,css:'filter: invert(1) brightness(1);'
        }



      ,iteration_preview:{
        _name:'iteration_preview'
        ,q:'.iteration .preview'
        ,css:'background: #0a0a0a;border-top: 1px solid #000000;border-bottom: 1px solid #000000;color: #888888;text-shadow: 1px 1px 1px #000000;'
        }
      ,layouts_story_preview_parens_before_after:{
        _name:'layouts_story_preview_parens_before'
        ,q:'.layouts .story .preview .parens:before,.layouts .story .preview .parens:after'
        ,css:'color:#222222;'
        }

      ,story_preview_owner:{
        _name:'story_preview_owner'
        ,q:'.story.bug .preview .owner, .story.chore .preview .owner, .story.feature .preview .owner, .story.release .preview .owner'
        ,css:'color:#667799'
        }
      ,story_delivered_preview:{
        _name:'story_delivered_preview'
        ,q:'.story.delivered .preview'
        ,css:'background-color:#535302;'
        }
      ,tracker_marker_label:{
        _name:'tracker_marker_label'
        ,q:'.tracker_markup .label'
        ,css:'background-color: rgba(0,0,0,0.8);border-radius: 8px;padding-left: 4px;padding-right: 4px;padding-bottom: 2px;'
        }
      ,story_finished_preview:{
        _name:'story_finished_preview'
        ,q:'.story.finished .preview'
        ,css:'background-color:#535302;'
        }
      ,story_rejected_preview:{
        _name:'story_rejected_preview'
        ,q:'.story.rejected .preview'
        ,css:'background-color:#535302;'
        }
      ,story_started_preview:{
        _name:'story_started_preview'
        ,q:'.story.started .preview'
        ,css:'background-color:#535302;'
        }
      ,story_started_preview_hover:{
        _name:'story_started_preview'
        ,q:'.story.started .preview:hover'
        ,css:'background-color:#ffff48;'
        }
      ,epic_preview_chevron:{
        _name:'epic_preview_chevron'
        ,q:'.epic .preview .chevron'
        ,css:'background-color:rgba(0,0,0,0.4);'
        }
      ,epic_preview_chevron_hover:{
        _name:'epic_preview_chevron_hover'
        ,q:'.epic .preview .chevron:hover'
        ,css:'background-color:rgba(0,0,0,0.6);'
        }
      ,epic_accepted_preview_chevron_hover:{
        _name:'epic_accepted_preview_chevron_hover'
        ,q:'.epic.accepted .preview .chevron:hover'
        ,css:'background-color:rgba(115, 255, 0, 0.26);'
        }
      ,epic_done_preview_chevron_hover:{
        _name:'epic_done_preview_chevron_hover'
        ,q:'.epic.done .preview .chevron:hover'
        ,css:'background-color:rgba(100, 100, 100, 0.26);'
        }
      ,epics_done_bar_hide:{
        _name:'epics_done_bar_hide'
        ,q:'.epics .done_bar.hide'
        ,css:'border-bottom:1px solid #444444;'
        }
      ,epic_progress_flyover_article:{
        _name:'epic_progress_flyover'
        ,q:'.epic_progress_flyover article'
        ,css:'background-color:rgba(0,0,0,0.9);'
        }
      ,epic_preview_progress_accepted:{
        _name:'epic_preview_progress_accepted'
        ,q:'.epic .preview>.progress .accepted'
        ,css:'background:linear-gradient(to right,#880088,#000000);'
        }
      ,epic_preview_progress_active:{
        _name:'epic_preview_progress_active'
        ,q:'.epic .preview>.progress .active'
        ,css:'background:linear-gradient(to right,#008800,#000000);'
        }
      ,epic_preview_progress_unstarted:{
        _name:'epic_preview_progress_unstarted'
        ,q:'.epic .preview>.progress .unstarted'
        ,css:'background:linear-gradient(to right,#888888,#000000);'
        }
      ,epic_preview_progress_unscheduled:{
        _name:'epic_preview_progress_unscheduled'
        ,q:'.epic .preview>.progress .unscheduled'
        ,css:'background:linear-gradient(to right,#222288,#000000);'
        }

      ,epic_progress_flyover_dt_active_dd_em:{
        _name:'epic_progress_flyover_dt_active_dd_em'
        ,q:'.epic_progress_flyover dt.active+dd em'
        ,css:'color:#008800;'
        }
      ,epic_progress_flyover_dt_accepted_dd_em:{
        _name:'epic_progress_flyover_dt_accepted_dd_em'
        ,q:'.epic_progress_flyover dt.accepted+dd em'
        ,css:'color:#880088;'
        }
      ,epic_progress_flyover_dt_unstarted_dd_em:{
        _name:'epic_progress_flyover_dt_unstarted_dd_em'
        ,q:'.epic_progress_flyover dt.unstarted+dd em'
        ,css:'color:#888888;'
        }
      ,epic_progress_flyover_dt_unscheduled_dd_em:{
        _name:'epic_progress_flyover_dt_unscheduled_dd_em'
        ,q:'.epic_progress_flyover dt.unscheduled+dd em'
        ,css:'color:#222288;'
        }

      ,epic_progress_flyover_dt_active_before:{
        _name:'epic_progress_flyover_dt_active_before'
        ,q:'.epic_progress_flyover dt.active:before'
        ,css:'background-color:#008800;'
        }
      ,epic_progress_flyover_dt_accepted_before:{
        _name:'epic_progress_flyover_dt_accepted_before'
        ,q:'.epic_progress_flyover dt.accepted:before'
        ,css:'background-color:#880088;'
        }
      ,epic_progress_flyover_dt_unstarted_before:{
        _name:'epic_progress_flyover_dt_unstarted_before'
        ,q:'.epic_progress_flyover dt.unstarted:before'
        ,css:'background-color:#888888;'
        }
      ,epic_progress_flyover_dt_unscheduled_before:{
        _name:'epic_progress_flyover_dt_unscheduled_before'
        ,q:'.epic_progress_flyover dt.unscheduled:before'
        ,css:'background-color:#222288;'
        }

      ,lightbox_stuff:{
        _name:'lightbox_stuff'
        ,q:'.lightbox.keyboard_shortcuts .content, .lightbox .lightbox.owner .content, .lightbox.move_to_project .content, .lightbox.project_color .content, .lightbox.save_search .content, .lightbox.story_density_mode .content, .lightbox.velocity_update .content, .notifications.menu .dd_menu .content, .projects.lightbox .content, .search_bar_container.next.menu .dd_menu .content'
        ,css:'background-color:rgba(0,0,0,0.8);'
        }
      ,input_std:{
        _name:'input_std'
        ,q:'input.std'
        ,css:'background-color:#000000;'
        }
      ,lightbox_lightbox_lightbox_owner_ul_li_selected:{
        _name:'lightbox_lightbox_lightbox_owner_ul_li_selected'
        ,q:'.lightbox .lightbox.owner ul li.selected'
        ,css:'background-color:#001122;'
        }
      ,lightbox_lightbox_owner_ul_li_selected_a:{
        _name:'lightbox_lightbox_owner_ul_li_selected_a'
        ,q:'.lightbox .lightbox.owner ul li.selected a'
        ,css:'color:#445588;'
        }
      ,new_section_model_details_persistence:{
        _name:'new_section_model_details_persistence'
        ,q:'.new section.model_details .persistence'
        ,css:'background-color:#191919;'
        }
      ,story_unscheduled_preview_hover:{
        _name:'story_unscheduled_preview_hover'
        ,q:'.story.unscheduled .preview:hover'
        ,css:'background-color:rgba(53, 96, 134, 0.23);'
        }
      ,state_button_start:{
        _name:'state_button_start'
        ,q:'.state.button.start'
        ,css:'background-color: transparent;border-color: #004400;color: #008800;'
        }
      ,state_button_start_hover:{
        _name:'state_button_start_hover'
        ,q:'.state.button.start:hover'
        ,css:'background-color: #003300;border-color: #005500;color: #009900;'
        }
      ,preview_reveal_button_locator:{
        _name:'preview_reveal_button_locator'
        ,q:'.preview .reveal.button .locator'
        ,css:'opacity:0.4;'
        }
      ,tracker_markup:{
        _name:'tracker_markup'
        ,q:'.tracker_markup'
        ,css:'color:#888888;'
        }
      ,flyover:{
        _name:'flyover'
        ,q:'.flyover'
        ,css:'background-color:transparent;'
        }
      ,flyover_x_flyover:{
        _name:'flyover_x'
        ,q:'.flyover.epic_flyover, .flyover.followers_flyover, .flyover.integration_story_flyover, .flyover.story_flyover'
        ,css:'border: 1px solid #000000;box-shadow: 2px 2px 7px #000000;opacity: 0.85;'
        }
      ,flyover_details:{
        _name:'flyover_details'
        ,q:'.flyover.story_flyover .unscheduled .details, .flyover.story_flyover .accepted .details, .flyover.story_flyover .unstarted .details'
        ,css:'background-color:#000000;'
        }
      ,flyover_hgroup_details:{
        _name:'flyover_hgroup_details'
        ,q:'.flyover.story_flyover .accepted hgroup.details, .flyover.story_flyover .delivered hgroup.details, .flyover.story_flyover .finished hgroup.details, .flyover.story_flyover .rejected hgroup.details, .flyover.story_flyover .started hgroup.details, .flyover.story_flyover .unscheduled hgroup.details'
        ,css:'background-color:#000000;border-bottom:0px solid transparent;box-shadow:none;'
        }
      ,flyover_epic_flyover_completion_date:{
        _name:'flyover_epic_flyover_completion_date'
        ,q:'.flyover.epic_flyover p.completion_date'
        ,css:'color:#888888;'
        }
      ,flyover_hgroup:{
        _name:'flyover_hgroup'
        ,q:'.flyover.epic_flyover hgroup,.flyover.followers_flyover hgroup,.flyover.integration_story_flyover hgroup,.flyover.story_flyover hgroup'
        ,css:'background-color:#222222;'
        }
      ,flyover_footer:{
        _name:'flyover_footer'
        ,q:'.flyover.epic_flyover footer,.flyover.followers_flyover footer,.flyover.integration_story_flyover footer,.flyover.story_flyover footer'
        ,css:'background-color:#222222;'
        }
      ,flyover_window:{
        _name:'flyover_window'
        ,q:'.flyover .window'
        ,css:'background-color:#111111;'
        }
      ,model_section_edit:{
        _name:'model_section_edit'
        ,q:'.model section.edit'
        ,css:'background:#111111;padding-bottom:10px;'
        }
      ,model_section_edit_li_activity:{
        _name:'model_section_edit_li_activity'
        ,q:'.model section.edit li>.activity'
        ,css:'background:#222222;'
        }
      ,panel_labels_panel_content:{
        _name:'panel_labels_panel_content'
        ,q:'.panel.labels .panel_content'
        ,css:'background:none;'
        }
      ,panel_labels_labels_items_label_visible:{
        _name:'panel_labels_labels_items_label_visible'
        ,q:'.panel.labels .labels_items .label.visible'
        ,css:'background:linear-gradient(to right, rgba(0,0,0,0),#0a0a0a);'
        }
      ,panel_history_preview:{
        _name:'panel_history_preview'
        ,q:'.panel.epic_history .activity_entry .preview, .panel.project_history .activity_entry .preview, .panel.story_history .activity_entry .preview'
        ,css:'background-color:#111111;color:#888888;'
        }
      ,panel_history_group:{
        _name:'panel_history_group'
        ,q:'.panel.epic_history .activity_entry .group, .panel.project_history .activity_entry .group, .panel.story_history .activity_entry .group'
        ,css:'background-color:#222222;'
        }
      ,panel_history_details:{
        _name:'panel_history_details'
        ,q:'.panel.epic_history .activity_entry .details, .panel.project_history .activity_entry .details, .panel.story_history .activity_entry .details'
        ,css:'background-color:#333333;color:#aaaaaa;'
        }
      ,panel_backlog_stories_marker_item:{
        _name:'panel_backlog_stories_marker_item'
        ,q:'.panel .backlog_stories_marker.item'
        ,css:'background-color:#222222;color:#888888;'
        }
      ,panel_icebox_stories_marker_item:{
        _name:'panel_icebox_stories_marker_item'
        ,q:'.panel .icebox_stories_marker.item'
        ,css:'background-color:#222222;color:#888888;'
        }
      ,CommentShow:{
        _name:'CommentShow'
        ,q:'.CommentShow___36VXJFEe'
        ,css:'border-left:4px solid #333333;'
        }
      ,CommentShow_name:{
        _name:'CommentShow_name'
        ,q:'.CommentShow__name___1OUfXWYu'
        ,css:'color:#888888;text-shadow:1px 1px 1px #000000;'
        }
      ,CommentShow_initials:{
        _name:'CommentShow_initials'
        ,q:'.CommentShow__initials___31d_0xSd'
        ,css:'background-color:#333333;border:1px solid #444444;color:#888888;'
        }
      ,CommentShow_text:{
        _name:'CommentShow_text'
        ,q:'.CommentShow__text___2ScGJ-4t'
        ,css:'color:#888888;'
        }
      ,StoryLabelsMaker_container:{
        _name:'StoryLabelsMaker_container'
        ,q:'.StoryLabelsMaker__container___3EAb3C9T'
        ,css:'background-color:#000000;color:#888888;border:1px solid #444444;'
        }
      ,LabelDropdownItem_highlighted:{
        _name:'LabelDropdownItem_highlighted'
        ,q:'.LabelDropdownItem--highlighted___31LRWeXx'
        ,css:'background-color:#001122;'
        }
      ,TaskEdit:{
        _name:'TaskEdit'
        ,q:'.TaskEdit___1Xmiy6lz'
        ,css:'background-color:rgba(0,0,0,0.6);'
        }

      ,TaskEdit_description:{
        _name:'TaskEdit_description'
        ,q:'.TaskEdit__description___2HWb7Rhx'
        ,css:'background-color:#000000;color:#888888;border:1px solid #444444;'
        }

      ,TaskShow:{
        _name:'TaskShow'
        ,q:'.TaskShow___2LNLUMGe'
        ,css:'background-color:rgba(0,0,0,0.6);color:#888888;border:1px solid #444444;'
        }

      ,TaskShow_hover:{
        _name:'TaskShow_hover'
        ,q:'.TaskShow___2LNLUMGe:hover'
        ,css:'background-color:#000000;'
        }
      ,CommentEdit:{
        _name:'CommentEdit'
        ,q:'.CommentEdit___3nWNXIac'
        ,css:'background-color:rgba(0,0,0,0.6);color:#888888;border:1px solid #444444;'
        }
      ,CommentEdit_add_comment:{
        _name:'CommentEdit_add_comment'
        ,q:'.CommentEdit__add-comment___2chBxqcu'
        ,css:'background-color:#333333;border:1px solid #444444;'
        }
      ,CommentEdit_add_comment_hover:{
        _name:'CommentEdit_add_comment_hover'
        ,q:'.CommentEdit__add-comment___2chBxqcu:hover:not(:disabled)'
        ,css:'background-color:#333333;'
        }
      ,DescriptionEdit_editor:{
        _name:'DescriptionEdit_editor'
        ,q:'.DescriptionEdit___1FO6wKeX .editor___1qKjhI5c'
        ,css:'background-color:#000000;border:1px solid #444444;color:#888888;'
        }
      ,LabelDropdown_dropdown:{
        _name:'LabelDropdown_dropdown'
        ,q:'.LabelDropdown__dropdown___PNsfkPba'
        ,css:'background-color:#000000;border:1px solid #444444;color:#888888;'
        }
      ,EpicStoriesHeader:{
        _name:'EpicStoriesHeader'
        ,q:'.EpicStoriesHeader___2FjEsj4O'
        ,css:'background-color:#111111;border-left:1px solid #000000;border-right:1px solid #000000;border-bottom:1px solid #000000;'
        }
      ,EpicStoriesHeader_reveal:{
        _name:'EpicStoriesHeader_reveal'
        ,q:'.EpicStoriesHeader__reveal___2JBXfhl3'
        ,css:'text-shadow:1px 1px 1px #000000;border-right:1px solid #444444;'
        }
      ,epic_accepted_preview:{
        _name:'epic_accepted_preview'
        ,q:'x.epic.accepted .preview'
        ,css:'background:linear-gradient(to right,#004400, #000000);'
        }
      ,epic_done_preview:{
        _name:'epic_done_preview'
        ,q:'x.epic.done .preview'
        ,css:'background:linear-gradient(to right,#006600, #000000);'
        }
      ,done_bar:{
        _name:'done_bar'
        ,q:'.done_bar'
        ,css:'border-bottom:1px solid #444444;'
        }
      ,done_bar_accepted_stories_bar:{
        _name:'done_bar_accepted_stories_bar'
        ,q:'.done_bar.accepted_stories_bar'
        ,css:'border-bottom:1px solid #444444;'
        }
      ,done_bar_label:{
        _name:'done_bar_label'
        ,q:'.done_bar label'
        ,css:'background:linear-gradient(to bottom, #000000, #222222);'
        }
      ,epics_done_bar_hide_a:{
        _name:'epics_done_bar_hide_a'
        ,q:'.epics .done_bar.hide a'
        ,css:'background:linear-gradient(to bottom, #000000, #222222);'
        }
      ,epics_done_bar_hide_a_hover:{
        _name:'epics_done_bar_hide_a_hover'
        ,q:'.epics .done_bar.hide a:hover'
        ,css:'background:linear-gradient(to bottom, #111111, #333333);'
        }
      ,done_bar_label_hover:{
        _name:'done_bar_label_hover'
        ,q:'.done_bar label:hover'
        ,css:'background:linear-gradient(to bottom, #111111, #333333);'
        }
      ,done_bar_a:{
        _name:'done_bar_a'
        ,q:'.done_bar a'
        ,css:'background:linear-gradient(to bottom, #000000, #222222);'
        }
      ,done_bar_a_hover:{
        _name:'done_bar_a_hover'
        ,q:'.done_bar a:hover'
        ,css:'background:linear-gradient(to bottom, #111111, #333333);'
        }
      ,IconButton_small:{
        _name:'IconButton_small'
        ,q:'.IconButton--small___3D375vVd'
        ,css:'background-color:#333333;'
        }
      ,IconButton_small_not_borderless:{
        _name:'IconButton_small_not_borderless'
        ,q:'.IconButton___2y4Scyq6:not(.IconButton--borderless___1t-CE8H2)'
        ,css:'background-color:#333333;border:1px solid #444444;'
        }
      ,IconButton_span_delete:{
        _name:'IconButton_span_delete'
        ,q:'.IconButton___2y4Scyq6>span[data-aid="delete"]'
        ,css:'filter:invert(1);'
        }
      ,IconButton_small_not_disabled_not_inverted_hover:{
        _name:'IconButton_small_not_disabled_not_inverted_hover'
        ,q:'.IconButton--small___3D375vVd:not(.IconButton--disabled___2cvk-s8R):not(.IconButton--inverted___2OWhVJqP):hover'
        ,css:'background-color:#000000;'
        }
      ,IconButton_small_not_disabled_not_inverted_span:{
        _name:'IconButton_small_not_disabled_not_inverted_span'
        ,q:'.IconButton--small___3D375vVd:not(.IconButton--disabled___2cvk-s8R):not(.IconButton--inverted___2OWhVJqP)>span'
        ,css:'filter:invert(1) hue-rotate(180deg);'
        }
      ,CommentEdit_initials:{
        _name:'CommentEdit_initials'
        ,q:'.CommentEdit__initials___149LoK2_'
        ,css:'background-color:#333333;color:#888888;border:1px solid #444444;'
        }
      ,CommentEdit_name:{
        _name:'CommentEdit_name'
        ,q:'.CommentEdit__name___1gAXlpcd'
        ,css:'color:#999999;'
        }
      ,MentionableTextArea_textarea:{
        _name:'MentionableTextArea_textarea'
        ,q:'.MentionableTextArea__textarea___2WDXl0X6'
        ,css:'background-color:#000000;color:#888888;border:1px solid #444444;'
        }
      ,TaskShow_toggle:{
        _name:'TaskShow_toggle'
        ,q:'.TaskShow__toggle___2mc0Lilm'
        ,css:'filter:invert(1);'
        }
      ,TaskEdit_dumbCheck:{
        _name:'TaskEdit__dumbCheck___10BB2AJ_'
        ,q:'.TaskEdit__dumbCheck___10BB2AJ_'
        ,css:'filter:invert(1);'
        }
      }
    ,parts:{                         //processableObjectsContainer
      _name:'parts'
      ,VIEW:{
        _name:'VIEW'
        ,q:'section.main'
        }
      ,root:{
        _name:'root'
        ,q:'#root'
        }
      ,html:{
        _name:'html'
        ,q:'html'
        }
      ,body:{
        _name:'body'
        ,q:'body'
        }
      ,focus:{
        _name:'focus'
        ,q:'*:focus'
        }
      } //-parts
    ,alter:{                         //controller
      _name:'alter'
      ,_items:{                      //processableObjectsContainer
        _name:'_items'
        ,root:{
          _name:'root'
          ,q:'#root'
          ,_init_:function(){
            //this.q.q.css('display','none');
            let s='';
            s+='<iframe';
            s+=' id="_pivotal_pane"';
            s+=' name="_pivotal_pane"';
            s+=' src="'+window.location.toString()+'"';
            s+=' style="width:100vw;height:50vh;"';
            s+='></iframe>';
            return s;
            // if (window===top) {
            //   $('body').append(s);
            //   console.log(s);
            // }
            }
          ,_init:function(){
            this._init_();
            }
          }
        } //-_items
      ,_init_:function(){            //ui.alter.
        __.utils.__initializer.bind(this._items)();
        // if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init_');}
        // for (var n in this._items) {
        //   if (!this._items.hasOwnProperty(n)) {continue;}
        //   var o=this._items[n];
        //   console.log('typeof o:'+(typeof o),o);
        //   if (o instanceof Object) {
        //     console.log('alter:'+o._name);
        //     o._init();
        //   }
        // }
        } //-_init_
      ,_init:function(){             //ui.alter.
        if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
        this._init_();
        } //-_init
      } //-alter
    ,_parts_init:function(){         //ui.
      this && this["UNUSED MEMBER\n"] && this["UNUSED MEMBER\n"](this._parts_init); // !unum - lint hack for webstorm
      for (const n in this.parts) {
        if (!this.parts.hasOwnProperty(n)) {continue;}
        const part=this.parts[n];
        if (!part instanceof Object) {continue;}
        if (!part.on) {continue;}
        const events=Object.keys(part.on);
        for (let x=0;x<events.length;x++) {
          const en=events[x];
          const evt=part.on[en];
          $(document).on(en,part.q,evt);
        }
      }
      } //-_parts_init
    ,onLoad:function(){              //ui.
      this.alter._init();
      } //-onLoad
    ,onMessage:function(data){       //ui.
      if (data.data.from==='VisualParadigm') {
        console.log('VisualParadigm onMessage',data.event);
      }
      } //-onMessage
    ,_init_:function(){              //ui.
      __.utils.__initializer.bind(this)();
      'onLoad'._sub&&'onLoad'._sub([this.onLoad,this]);
      'onMessage'._sub&&'onMessage'._sub([this.onMessage,this]);
      } //-_init_
    ,_init:function(){               //ui.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      this._init_();
      } //-_init
    } //-ui
  ,events:{                          //dispatchObjectContainer
    _name:'event'
    ,dom:{                           //dispatchObject
      _name:'dom'
      ,node_removed:function(event){  //events.dom
        this && this["UNUSED PARAM\n"] && this["UNUSED PARAM\n"](event); // !unup - lint hack for webstorm
        //console.log('node_removed',event);
        } //-node_removed
      ,node_inserted:function(event){ //events.dom
        //console.log('node_inserted',event);
        const me=$(event.target);
        } //-node_inserted
      } //-dom
    ,kbd:{                           //dispatchObject
      _name:'kbd'
      } //-kbd
    ,doc:{                           //dispatchObject
      _name:'doc'
      ,_17_ct:0
      ,_keysdown:{                   //dataContainer
        } //-_keysdown
      ,cas:function(){               //events.doc.
        let cas='';
        //noinspection JSUnresolvedVariable
        if (__.events.doc._keysdown._17!==undefined) {cas+='c';}
        //noinspection JSUnresolvedVariable
        if (__.events.doc._keysdown._18!==undefined) {cas+='a';}
        //noinspection JSUnresolvedVariable
        if (__.events.doc._keysdown._16!==undefined) {cas+='s';}
        return cas;
        } //-cas
      ,_do_call:function(code,evt){  //events.doc.
        if (__.data.showkeys) {console.log('code:'+code);}
        //console.log('code:'+code);
        code._bc({evt:evt});
        if (typeof __.events.kbd[code]==='function') {
          //console.log('press:'+code);
          if (this._check_call(__.events.kbd[code])) {
            return __.events.kbd[code](evt);
          }
        }else if (jQuery.isArray(__.events.kbd[code])) {
          const a=__.events.kbd[code];
          for (let x=0;x<a.length;x++) {
            if (typeof a[x]==='function') {
              console.log('press:'+x+' '+code);
              if (!this._check_call(a[x])) {
                console.log('item failed _check_call :'+x+' '+code);
                continue;
              }
              const rv=a[x](evt);
              if (rv!==undefined) {
                if (rv===false) {
                  // return 'continue'
                  return rv;
                }
              }
            }
          }
        }
        } //-_do_call
      ,_check_call:function(fo){     //events.doc.
        if (fo.me===undefined) {
          return true;
        }
        console.log('_check_call:j:'+fo.me.k.j);
        if (fo.me.k.j.indexOf('c')===-1&&fo.me.k.j.indexOf('a')===-1&&fo.me.k.j.indexOf('s')===-1) {
          console.log('_check_call:plainkey?:'+fo.me.k.j);
          // plain key
          let kc=fo.me.k.j.substr(1);
          kc=parseInt(kc);
          console.log('_check_call:plainkey?:kc:'+kc);
          // enter esc space 0-9
          const aa=[13,27,32,48,49,50,51,52,53,54,55,56
           // - = bs
           ,189,187,8
           // a-z
           ,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90
           // [ ] \
           ,219,221,220
           // ; '
           ,186,222
           // ,./
           ,188,190,191
           // ins hom pu del end pd
           ,45,36,33,46,35,34
           // left right up down
           ,37,39,38,40
           // f1-f12  3  4  5    6   7   8   9  10   11  12
           //,112,113,114,115,116,117,118,119,120,121,122,123
           // num / * - + .
           ,111,106,109,107,110
           // num 0-9    5   6   7   8   9
           ,96,97,98,99,100,101,102,103,104
           ];
          console.log('_check_call:aa.indexOf('+kc+'):'+aa.indexOf(kc));
          if (aa.indexOf(kc)!==-1) {
            if (__.state.inEditor()) {
              console.log('exit inEditor:'+kc+' '+fo.me.n);
              return false;
            }
          }
        }
        // return true if should call
        //noinspection JSUnresolvedVariable
        let w=fo.me.W;
        //console.log('fo,fo.me:',fo,fo.me);
        if (w===undefined) {
          return true;
        }
        //console.log('w',w);
        w=w.split(',');
        //console.log('w',w);
        //w=__.utils.cleanFor(w,'string');
        //console.log('w',w);
        //console.log('w.length',w.length);
        const ay=[];
        const an=[];
        for (let x=0;x<w.length;x++) {
          const i=w[x];
          if (typeof i!=='string') {
            continue;
          }
          if (i.substr(0,1)==='!') {
            an.push(i.substr(1));
          }else{
            ay.push(i);
          }
        }
        //console.log('ay',ay,'an',an);
        //ay=__.utils.cleanFor(ay,'string');
        //an=__.utils.cleanFor(an,'string');
        //console.log('ay',ay,'an',an);
        function tryIt(s){
          const f=__.state['is'+s];
          if (typeof f!=='function') {
            console.error('state Fn not found:is'+s+'()');
            return false;
          }
          //noinspection UnnecessaryLocalVariableJS
          const rv=__.state['is'+s]();
          return rv;
        }
        let yy=false;
        for (let x=0;x<ay.length;x++) {
          if (tryIt(ay[x])) {
            yy=true;
          }
        }
        if (ay.length===0) {
          yy=true;
        }
        let nn=false;
        for (let x=0;x<an.length;x++) {
          if (tryIt(an[x])) {
            nn=true;
          }
        }
        if (yy&&(!nn)) {
          //console.log(fo,'yy:'+yy+' nn:'+nn+' rv:true');
          return true;
        }
        //console.log(fo,'yy:'+yy+' nn:'+nn+' rv:false');
        return false;
        } //-_check_call
      ,keypress:function(evt){       //events.doc.
        if (__.data.showkeys) {console.log('document.keypress',evt.keyCode);}
        const cas=__.utils.cas(evt);
        const foc=$(':focus');
        if (foc.length===1&&foc.prop('tagName')==='TEXTAREA') {return;}
        const code='k_'+cas+'p'+evt.keyCode;
        return this._do_call(code,evt);
        } //-keypress
      ,keyup:function(evt){          //events.doc.
        if (__.data.showkeys) {console.log('document.keyup',evt.keyCode);}
        //const foc=$(':focus');
        //console.log('document.keyup.tagName',foc.prop('tagName'));
        const cas=__.utils.cas(evt);
        if (this._keysdown['_'+evt.keyCode]!==undefined) {
          delete this._keysdown['_'+evt.keyCode];
        }
        const code='k_'+cas+'u'+evt.keyCode;
        return this._do_call(code,evt);
        } //-keyup
      ,keydown:function(evt){        //events.doc.
        const foc=$(':focus');
        if (0) {
          if (foc.length===1&&foc.prop('tagName')==='TEXTAREA') {
            if (evt.keyCode!==17&&evt.keyCode!==18&&evt.keyCode!==16) {
              return;
            }
          }
        }
        if (this._keysdown['_'+evt.keyCode]!==undefined) {return;}
        if (__.data.showkeys) {console.log('document.keydown',evt.keyCode);}
        //if (document.sk) {console.log('document.keydown',evt.keyCode);}
        this._keysdown['_'+evt.keyCode]=new Date();
        const cas=__.utils.cas(evt);
        const code='k_'+cas+'d'+evt.keyCode;
        return this._do_call(code,evt);
        } //-keydown
      } //-doc
    ,win:{                           //dispatchObject
      _name:'win'
      ,resize:function(event){       //events.win.
        this && this["UNUSED PARAM\n"] && this["UNUSED PARAM\n"](event); // !unup - lint hack for webstorm
        console.log('win.resize');
        __.actions.reportWindowData();
        } //-resize
      ,hashChange:function(event){   //events.win.
        'onHashChange'._bc({event:event});
        } //-hashChange
      ,message:function(event){      //events.win.
        if (event.data.action==='reportWindowData') {
          __.data.windowData[event.data.from]=event.data.windowData;
        }
        'onMessage'._bc&&'onMessage'._bc({event:event, data:event.data});
        } //-message
      } //-win
    } //-event
  ,inits:{                           //functionsContainer
    _name:'inits'
    ,bug:false
    ,protos:function(){              //inits.
      this.bug&&console.log('bugging:'+arguments.callee.name);
      if (arguments.callee.initialized) {console.error('already initialized');return;}arguments.callee.initialized=true;
      const __entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
        };//-__entityMap
      function strp(n,f){
        if (String.prototype[n]) {
          alert('HAS String.prototype.'+n);
        }else{
          String.prototype[n]=f;
        }
      }
      strp('escapeHTML',
        function() {
          return String(this).replace(/[&<>"'\/]/g, function (s) {
              return __entityMap[s];
          });
        }
      );
      strp('_of',function(that){
        const s=this.toString();
        return that[s];
        }); //-_of
      strp('qo',function(){
        const s=''+this;
        return $(s);
        }); //-qo
      String.prototype._ropf=function(o,fn){
        const n=''+this;
        if (o[n]) {
          alert(' is already defined');
          return;
        }
        Object.defineProperty(o,n, {
          get: fn
          ,set: function() { throw "Cannot set Read Only Property '"+n+"'"; }
          ,enumerable: true
          ,configurable: false
        });
        }; //-_ropf
      String.prototype._ropq=function(o,sel){
        const n=''+this;
        Object.defineProperty(o, n, {
          get: function(){
            return $(sel);
          }
          ,set: function() { throw "Cannot set Read Only Property '"+n+"'"; }
          ,enumerable: true
          ,configurable: false
        });
        }; //-_ropq
      String.prototype._ropqc=function(o,sel){
        const n=''+this;
        Object.defineProperty(o, n, {
          get: function(){
            if (!arguments.callee.cache) {
              arguments.callee.cache=$(sel);
            }
            return arguments.callee.cache;
          }
          ,set: function() { throw "Cannot set Read Only Property '"+n+"'"; }
          ,enumerable: true
          ,configurable: false
        });
        }; //-_ropqc
      String.prototype._pf=function(o,get_f,set_f){
        const n=''+this;
        Object.defineProperty(o, n, {
          get: get_f
          ,set: set_f
          ,enumerable: true
          ,configurable: false
        });
        }; //-_pf
      // 's'._ropf(String.prototype,function(){
      //   console.log(''+this,this.q[0]);
      //   return this.q;
      //   }); // -q

      'q'._ropf(String.prototype,function(){
        return this.qo();
        }); // -q

      // 'e'._ropf(String.prototype,function(){
      //   const q=this.qo();
      //   console.info(this+':',q.length);
      //   //const dp=q.getDomPath();
      //   // console.info(dp);
      //   // const t='2px dotted red';
      //   // location.href='aip://clip/'+encodeURI(dp);
      //   //return q
      //   // .css('border',t)
      //   // .css('border-left',t)
      //   // .css('border-top',t)
      //   // .css('border-bottom',t)
      //   // .css('border-right',t)
      //   // .css('box-shadow','inset 0px 0px 10px 2px #F00')
      //   // .css('-webkit-filter','brightness(5) contrast(1.6)');
      //   return null;
      //   });
      'ee'._ropf(String.prototype,function(){
        const q=this.qo();
        console.info(this+':',q.length);
        return q
         .css('border','')
         .css('border-left','')
         .css('border-top','')
         .css('border-bottom','')
         .css('border-right','')
         .css('box-shadow','')
         .css('-webkit-filter','');
      });
      'exists'._ropf(String.prototype,function(){
        const s=''+this;
        return s.q.length!==0;
      });
      '_one'._ropf(String.prototype,function(){
        const s=''+this;
        return s.q.length===1;
      });
      // 'p'._ropf(String.prototype,function(){
      //   const s=''+this;
      //   if (s.exists) {
      //     if (s.q.length===1) {
      //       return s.q.getDomPath();
      //     }
      //     const a=[];
      //     s.q.each(function(){
      //       const me=$(this);
      //       a.push(me.getDomPath());
      //     });
      //     return a;
      //   }
      //   return null;
      // });
      'singleSpace'._ropf(String.prototype,function(){
        const s=''+this;
        return s.replace(/\s{2,}/g, ' ');
      });
      '_trim'._ropf(String.prototype,function(){
        const s=''+this;
        return $.trim(s);
      });
      '_abbr'._ropf(String.prototype,function(){
         let s=''+this;
         if (s==='') {
           return '';
         }
         s=s.replace(/[^a-zA-Z0-9]/g,' ');
         const a=[];
         let p_type;
         const m={su:true,sl:true,sn:true,nl:true,nu:true,lu:true,uu:true,ln:true,un:true};
         for(let x=0;x<s.length;x++){
           const e=s.substr(x,1);
           let is_type;//ulns
           if ('0123456789'.indexOf(e)>=0){is_type='n';
           }else if('abcdefghijklmnopqrstuvwxyz'.indexOf(e)>=0){is_type='l';
           }else if('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(e)>=0){is_type='u';
           }else{is_type='s';
           }
           if(p_type===undefined){
             if(is_type!=='s'){
               a.push(e);
             }
           }else{
             //noinspection JSUnusedAssignment
             if (m[p_type+is_type]){
               a.push(e);
             }
           }
           p_type=is_type;
         }
         return a.join('').toUpperCase();
      });
      '_numwrap'._ropf(String.prototype,function(){
         const s=''+this;
         return '&#9129;'+s+'&#9131;';
      });
      '_l'._ropf(String.prototype,function(){
         const s=''+this;
         console.log(s);
      });
      '_i'._ropf(String.prototype,function(){
         const s=''+this;
         console.info(s);
      });
      '_w'._ropf(String.prototype,function(){
         const s=''+this;
         console.warn(s);
      });
      'delimiter'._ropf(String.prototype,function(){
        const s=this.toString();
        //var dels=String.fromCharCode(13)+String.fromCharCode(9)+'|:.,;_=-'+' ';
        const dels=(String.fromCharCode(13)+String.fromCharCode(9)+'|,;'+' '+':.-_').split('');
        for (let x=0;x<dels.length;x++) {
          const ss=dels[x];
          if (s.indexOf(ss)!==-1) {
            return ss;
          }
        }
        return '';
      });
      String.prototype.inList=function(list,del){
        const s=this.toString();
        if (typeof list==='string') {
          let d=list.delimiter;
          if (d==='') {
            d=' ';
          }
          del=d;
          list=list.split(del);
        }
        return list.indexOf(s)!==-1;
      };
      String.prototype.hasItem=function(item,del){
        const s=this.toString();
        return item.inList(s,del);
      };
      String.prototype._bc=function(o,that_){return radio(this.toString()).broadcast(o,that_);};
      String.prototype._sub=function(a1,a2,a3,a4){return radio(this.toString()).subscribe(a1,a2,a3,a4);};
      if (0) {
        '_f4'._ropf(String.prototype,function(){
           const s=''+this;
           setTimeout(function(){
             s.q.focus();
           },4000);
           return s.q[0];
        });
        '_viz'._ropf(String.prototype,function(){
           const s=''+this;
           function comp(s){
             const co=tinycolor(s);
             //noinspection JSUnresolvedFunction
             const hsl=co.toHsl();
             const c=1;
             const a=0.5;
             const b=0.5;
             //noinspection UnnecessaryLocalVariableJS
             const v=Math.sqrt(a*hsl.h*a*hsl.h + b*hsl.s*b*hsl.s + c*hsl.l*c*hsl.l);
             return v;
           }
           const v0=comp(s);
           let at=10000;//Number.Infinity;
           let found;
           //noinspection JSUnresolvedVariable
           vizcolors.forEach(function(cc){
             const v=comp(cc.c);
             //console.log('v',v);
             const dif=Math.abs(v0-v);
             //console.log('dif',dif);
             if (dif<at) {
               //console.log('found..',cc);
               at=dif;
               found=cc;
             }
           });
           if (found) {
             return found;
           }
        });
        if (1) {
        }
        //'.simple-balloon.app-filters-popover .navigation li.selected'._f4
        String.prototype._abbr2=function(allows){
          let s=''+this;
          if (s==='') {
            return '';
          }
          const allows2=allows.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
          const re=new RegExp('[^a-zA-Z0-9'+allows2+']','g');
          s=s.replace(re,' ');
          const s0=s.replace(/ /g,'');
          const a=[];
          let p_type;
          const m={su:true,sl:true,sn:true,nl:true,nu:true,lu:true,uu:true,ln:true,un:true};
          for(let x=0;x<s.length;x++){
            const e=s.substr(x,1);
            let is_type;//ulns
            if ('0123456789'.indexOf(e)>=0){is_type='n';
            }else if('abcdefghijklmnopqrstuvwxyz'.indexOf(e)>=0){is_type='l';
            }else if('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(e)>=0){is_type='u';
            }else{is_type='s';
            }
            if(p_type===undefined){
              if(is_type!=='s'){
                a.push(e);
              }else{
                if (allows.indexOf(e)>=0) {a.push(e);}
              }
            }else{
              //noinspection JSUnusedAssignment
              if (m[p_type+is_type]){
                a.push(e);
              }else{
                if (allows.indexOf(e)>=0) {a.push(e);}
              }
            }
            p_type=is_type;
          }
          if (a.length===1) {
            a.push(s0.substr(1,2));
          }
          return a.join('').toUpperCase();
        };
      }
      } //-protos
    ,jquery_addons:function(){       //inits.
      if (arguments.callee.initialized) {console.error('already initialized');return;}arguments.callee.initialized=true;
      //noinspection JSUnresolvedVariable
      (function($,sr){ //smartresize event
        /// // usage:
        /// $(window).smartresize(function(){
        ///   // code that takes it easy...
        /// });
        const debounce = function (func, threshold, execAsap) {
          let timeout;
          return function debounced () {
            let obj = this;
            const args = arguments;
            function delayed () {
              if (!execAsap){
                //noinspection JSUnresolvedFunction
                func.apply(obj, args);
              }
              timeout = null;
            }
            if (timeout){
              clearTimeout(timeout);
            } else if (execAsap){
              //noinspection JSUnresolvedFunction
              func.apply(obj, args);
            }
            timeout = setTimeout(delayed, threshold || 100);
          };
        };
        // smartresize
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
      })(jQuery,'smartresize');
      //noinspection JSUnresolvedVariable
      (function($){ //replaceText
        $.fn.replaceText = function( search, replace, text_only ) {
          return this.each(function(){
            let node = this.firstChild,val,new_val,remove = [];
            if ( node ) {
              do {
                if ( node.nodeType === 3 ) {
                  val = node.nodeValue;new_val = val.replace( search, replace );
                  if ( new_val !== val ) {
                    if ( !text_only && /</.test( new_val ) ) {
                      $(node).before( new_val );remove.push( node );
                    } else {
                      node.nodeValue = new_val;
                    }
                  }
                }
              } while ( node = node.nextSibling );
            }
            remove.length && $(remove).remove();
          });
        };
      })(jQuery);
      //noinspection JSUnresolvedVariable
      (function($){
        $.fn.visibles = function() {
          return this.filter(function(){
            //noinspection JSUnresolvedFunction
            return !this.isVisible();
          });
        };
      })(jQuery);
      //noinspection JSUnresolvedVariable
      (function($){ //.withText
        $.fn.withText = function( search ) { //+ text_only second arg unused
          const rv=this.contents().filter(
            function(){
              if (this.nodeType!==3) {
                return false;
              }
              //var me=$(this);
              const txt=this.nodeValue;
              if (typeof search==='object') {//re
                return search.test(txt);
              }
              return txt.indexOf(search)!==-1;
            }
          );
          return rv.parent();
       };
      })(jQuery);
      //noinspection JSUnresolvedVariable
      (function( $ ){ //.getDomPath
        const getStringForElement = function (el) {
          let string = el.tagName.toLowerCase();
          if (el.id) {
            string += "#" + el.id;
          }
          if (el.className) {
            if (typeof el.className==='string') {
              if (el.className!=='') {
                string += "." + el.className.replace(/\s+/g,' ').replace(/\s/g, '.');
              }
            }
          }
          string=string.replace(/\.\.*/,'.');
          return string;
        };
        $.fn.getDomPath = function(string) {
          if (typeof(string) === "undefined") {
            string = true;
          }
          const p = [];
          const el = $(this).first();
          el.parents().not('html').each(function() {
            p.push(getStringForElement(this));
          });
          p.reverse();
          p.push(getStringForElement(el[0]));
          return string ? p.join(" > ") : p;
        };
      })( jQuery );
      (function( $, undefined ) { //.simulate
        const rkeyEvent = /^key/,
          rmouseEvent = /^(?:mouse|contextmenu)|click/;
        $.fn.simulate = function( type, options ) {
          return this.each(function() {
            new $.simulate( this, type, options );
          });
        }; //-simulate
        $.simulate = function( elem, type, options ) {
          const method = $.camelCase( "simulate-" + type );
          this.target = elem;
          this.options = options;
          if ( this[ method ] ) {
            this[ method ]();
          } else {
            this.simulateEvent( elem, type, options );
          }
        }; //-simulate
        $.extend( $.simulate, {
          keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
          }, //-keyCode
          buttonCode: {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
          } //-buttonCode
        });
        $.extend( $.simulate.prototype, {
          simulateEvent: function( elem, type, options ) {
            const event = this.createEvent( type, options );
            this.dispatchEvent( elem, type, event, options );
          }, //-simulateEvent
          createEvent: function( type, options ) {
            if ( rkeyEvent.test( type ) ) {
              return this.keyEvent( type, options );
            }
            if ( rmouseEvent.test( type ) ) {
              return this.mouseEvent( type, options );
            }
          }, //-createEvent
          mouseEvent: function( type, options ) {
            let event, eventDoc, doc, body;
            options = $.extend({
              bubbles: true,
              cancelable: (type !== "mousemove"),
              view: window,
              detail: 0,
              screenX: 0,
              screenY: 0,
              clientX: 1,
              clientY: 1,
              ctrlKey: false,
              altKey: false,
              shiftKey: false,
              metaKey: false,
              button: 0,
              relatedTarget: undefined
            }, options );
            if ( document.createEvent ) {
              event = document.createEvent( "MouseEvents" );
              //noinspection JSDeprecatedSymbols
              event.initMouseEvent( type, options.bubbles, options.cancelable,
                options.view, options.detail,
                options.screenX, options.screenY, options.clientX, options.clientY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
                options.button, options.relatedTarget || document.body.parentNode );
              // IE 9+ creates events with pageX and pageY set to 0.
              // Trying to modify the properties throws an error,
              // so we define getters to return the correct values.
              if ( event.pageX === 0 && event.pageY === 0 && Object.defineProperty ) {
                eventDoc = event.relatedTarget.ownerDocument || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;
                Object.defineProperty( event, "pageX", {
                  get: function() {
                    return options.clientX +
                      ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
                      ( doc && doc.clientLeft || body && body.clientLeft || 0 );
                  }
                });
                Object.defineProperty( event, "pageY", {
                  get: function() {
                    return options.clientY +
                      ( doc && doc.scrollTop || body && body.scrollTop || 0 ) -
                      ( doc && doc.clientTop || body && body.clientTop || 0 );
                  }
                });
              }
            } else if ( document.createEventObject ) {
              event = document.createEventObject();
              $.extend( event, options );
              // standards event.button uses constants defined here: http://msdn.microsoft.com/en-us/library/ie/ff974877(v=vs.85).aspx
              // old IE event.button uses constants defined here: http://msdn.microsoft.com/en-us/library/ie/ms533544(v=vs.85).aspx
              // so we actually need to map the standard back to oldIE
              event.button = {
                0: 1,
                1: 4,
                2: 2
              }[ event.button ] || ( event.button === -1 ? 0 : event.button );
            }
            return event;
          }, //-mouseEvent
          keyEvent: function( type, options ) {
            let event;
            options = $.extend({
              bubbles: true,
              cancelable: true,
              view: window,
              ctrlKey: false,
              altKey: false,
              shiftKey: false,
              metaKey: false,
              keyCode: 0,
              charCode: undefined
            }, options );
            if ( document.createEvent ) {
              try {
                event = document.createEvent( "KeyEvents" );
                //noinspection JSUnresolvedFunction
                event.initKeyEvent( type, options.bubbles, options.cancelable, options.view,
                  options.ctrlKey, options.altKey, options.shiftKey, options.metaKey,
                  options.keyCode, options.charCode );
              // initKeyEvent throws an exception in WebKit
              // see: http://stackoverflow.com/questions/6406784/initkeyevent-keypress-only-works-in-firefox-need-a-cross-browser-solution
              // and also https://bugs.webkit.org/show_bug.cgi?id=13368
              // fall back to a generic event until we decide to implement initKeyboardEvent
              } catch( err ) {
                event = document.createEvent( "Events" );
                event.initEvent( type, options.bubbles, options.cancelable );
                $.extend( event, {
                  view: options.view,
                  ctrlKey: options.ctrlKey,
                  altKey: options.altKey,
                  shiftKey: options.shiftKey,
                  metaKey: options.metaKey,
                  keyCode: options.keyCode,
                  charCode: options.charCode
                });
              }
            } else if ( document.createEventObject ) {
              event = document.createEventObject();
              $.extend( event, options );
            }
            if ( !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() ) || (({}).toString.call( window.opera ) === "[object Opera]") ) {
              event.keyCode = (options.charCode > 0) ? options.charCode : options.keyCode;
              event.charCode = undefined;
            }
            return event;
          }, //-keyEvent
          dispatchEvent: function( elem, type, event ) {
            if ( elem[ type ] ) {
              elem[ type ]();
            } else if ( elem.dispatchEvent ) {
              elem.dispatchEvent( event );
            } else if ( elem.fireEvent ) {
              elem.fireEvent( "on" + type, event );
            }
          }, //-dispatchEvent
          simulateFocus: function() {
            let focusinEvent,
              triggered = false;
            const element = $( this.target );
            function trigger() {
              triggered = true;
            }
            element.bind( "focus", trigger );
            element[ 0 ].focus();
            if ( !triggered ) {
              focusinEvent = $.Event( "focusin" );
              focusinEvent.preventDefault();
              element.trigger( focusinEvent );
              element.triggerHandler( "focus" );
            }
            element.unbind( "focus", trigger );
          }, //-simulateFocus
          simulateBlur: function() {
            let focusoutEvent,
              triggered = false;
            const element = $( this.target );
            function trigger() {
              triggered = true;
            }
            element.bind( "blur", trigger );
            element[ 0 ].blur();
            // blur events are async in IE
            setTimeout(function() {
              // IE won't let the blur occur if the window is inactive
              if ( element[ 0 ].ownerDocument.activeElement === element[ 0 ] ) {
                element[ 0 ].ownerDocument.body.focus();
              }
              // Firefox won't trigger events if the window is inactive
              // IE doesn't trigger events if we had to manually focus the body
              if ( !triggered ) {
                focusoutEvent = $.Event( "focusout" );
                focusoutEvent.preventDefault();
                element.trigger( focusoutEvent );
                element.triggerHandler( "blur" );
              }
              element.unbind( "blur", trigger );
            }, 1 );
          } //-simulateBlur
        });
        /** complex events **/
        function findCenter( elem ) {
          const document = $( elem.ownerDocument );
          elem = $( elem );
          const offset = elem.offset();
          //noinspection JSUnresolvedFunction
          return {
            //noinspection JSUnresolvedFunction
            x: offset.left + elem.outerWidth() / 2 - document['scrollLeft'](),
            //noinspection JSUnresolvedFunction
            y: offset.top + elem.outerHeight() / 2 - document['scrollTop']()
          };
        }
        function findCorner( elem ) {
          const document = $( elem.ownerDocument );
          elem = $( elem );
          const offset = elem.offset();
          //noinspection JSUnresolvedFunction
          return {
            x: offset.left - document['scrollLeft'](),
            y: offset.top - document['scrollTop']()
          };
        }
        $.extend( $.simulate.prototype, {
          simulateDrag: function() {
            let i = 0;
            const target = this.target;
            const eventDoc = target.ownerDocument;
            const options = this.options;
            const center = options.handle === "corner" ? findCorner( target ) : findCenter( target );
            let x = Math.floor( center.x );
            let y = Math.floor( center.y );
            let coord = { clientX: x, clientY: y };
            //noinspection JSUnresolvedVariable
            const dx = options.dx || ( options.x !== undefined ? options.x - x : 0 );
            //noinspection JSUnresolvedVariable
            const dy = options.dy || ( options.y !== undefined ? options.y - y : 0 );
            //noinspection JSUnresolvedVariable
            const moves = options.moves || 3;
            this.simulateEvent( target, "mousedown", coord );
            for ( ; i < moves ; i++ ) {
              x += dx / moves;
              y += dy / moves;
              coord = {
                clientX: Math.round( x ),
                clientY: Math.round( y )
              };
              this.simulateEvent( eventDoc, "mousemove", coord );
            }
            if ( $.contains( eventDoc, target ) ) {
              this.simulateEvent( target, "mouseup", coord );
              this.simulateEvent( target, "click", coord );
            } else {
              this.simulateEvent( eventDoc, "mouseup", coord );
            }
          } //-simulateDrag
        });
      })( jQuery );
      $.fn.extend({ //.hasClasses
        hasClasses: function (selectors) {
          const self = this;
          selectors=typeof selectors==='string'?selectors.split(' '):selectors;
          for (const i in selectors) {
            if (!selectors.hasOwnProperty(i)) {
              continue;
            }
            if ($(self).hasClass(selectors[i])) {
              return true;
            }
          }
          return false;
        } // fn
      });
      /*
       * outerHtml
       * https://github.com/JamesMGreene/jquery.outerHtml
       *
       * Copyright (c) 2013 James M. Greene
       * Licensed under the MIT license.
       */
      (function($) { //.outerHtml
        'use strict';
        //noinspection PointlessBooleanExpressionJS
        const hasNativeOuterHTML = !!('outerHTML' in $('<div></div>').get(0));
        // Prefer the native `outerHTML` property when possible
        const getterFn = function() {
          const target = this.get(0);
          // If the browser supports the `outerHTML` property on elements AND if `target` is an element node
          if (hasNativeOuterHTML && target.nodeType === 1) {
            return target.outerHTML;
          }else {
            return $('<div></div>').append(this.eq(0).clone()).html();
          }
        }; //-getterFn
        const setterFn = function(value) {
          // Do not attempt to replace anything using the native `outerHTML` property setter
          // even if it exists: it is riddled with bugs!
          return $('<div id="jquery-outerHtml-transformer"></div>').append(value).contents().replaceAll(this);
        }; //-setterFn
        // Detect jQuery 1.8.x bug (for which the value here is `false`)
        let doesNotLeaveTempParentOnDetachedDomElement = true;
        $.fn.outerHtml = function(value) {
          if (arguments.length) {
            if (doesNotLeaveTempParentOnDetachedDomElement) {
              return setterFn.call(this, value);
            }
            else {
              // Fix for jQuery 1.8.x bug: https://github.com/JamesMGreene/jquery.outerHtml/issues/1
              const parentsOfThis = (function() {
                const parents = new Array(this.length);
                this.each(function(i) {
                  parents[i] = this.parentNode || null;
                });
                return parents;
              }).call(this);
              return setterFn['call'](this, value).map(function(i) {
                if (!parentsOfThis[i]) {
                  if (this.parentNode) {
                    return this.parentNode.removeChild(this);
                  }
                }
                else if (parentsOfThis[i] !== this.parentNode) {
                  // Appending to the end: this doesn't seem right but it should cover the detached DOM scenarios
                  return parentsOfThis[i].appendChild(this);
                }
                return this;
              });
            }
          }
          else {
            return getterFn.call(this);
          }
        }; //-outerHtml
        // Detect jQuery 1.8.x bug (for which the value here is `false`)
        doesNotLeaveTempParentOnDetachedDomElement = (function() {
          const parent = $('<s>bad</s>').outerHtml('<div>good</div>').get(0).parentNode;
          return (parent.nodeName === '#document-fragment' && parent.nodeType === 11);
        })();
      }(jQuery));
      } //-jquery_addons
    ,libs:function(){                //inits.
      __.libs._init();
      } //-libs
    ,hooks:function(){               //inits.
      __.hooks._init();
      } //-hooks
    ,styles:function(){              //inits.
      __.style._init();
      } //-styles
    ,ui:function(){                  //inits.
      __.ui._init();
      } //-ui
    ,_init_:function(){              //inits.
      __.utils.body_msg('inits...');
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init_');}
      this.protos();
      this.jquery_addons();
      const that=this;
      function next(){
        that.libs();
        that.hooks();
        that.styles();
        that.ui();
      }
      //__.inits.messaging();
      //__.ctrls._init();
      //__.inits.dom_hook();
      //+this.keyset();
      //+this.key_hook();
      //__.inits.styles();
      function waitLoad(){
        if (false&&!__.state.isViewLoaded()) {
          setTimeout(waitLoad,500);
          return;
        }
        next();
        __.INITIALIZED=true;
        delete __.INITIALIZING;
        console.log('__.inits._init_() completed');
        //$('body').css('opacity','1');
        $('body').addClass('fadein');
        'onLoad'._bc&&'onLoad'._bc();
      }
      waitLoad();
      //this.fixes();
      } //-_init_
    ,_init:function(){               //inits.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      this._init_();
      //__.utils.addScript('http://mrobbinsassoc.com/projects/keyprism3/tinycolor.js');
      } //-_init
    } //-inits
  ,init:{                            //main
    _name:'init'
    ,_init_:function(){ //init.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init_');}
      __.inits._init();
      } //-_init_
    ,_init:function(){ //init.
      if (__.set.bugInits) {console.info('bugInits:'+this._name+'_init');}
      if (__.INITIALIZING||__.INITIALIZED) {
        return;
      }
      if (!__.state.isGoodUrl()) {
        console.log('!__.state.isGoodUrl()');
        return;
      }
      __.INITIALIZING=true;
      function waitLoad(){
        if (!window.$) {
          setTimeout(waitLoad,500);
          return;
        }
        __.init._init_();
      }
      waitLoad();
      } //-_init
    } //-init
};

__.utils.addScript('https://medialize.github.io/sass.js/dist/sass.sync.js','sassscr');
//__.utils.addScript('https://medialize.github.io/sass.js/dist/sass.worker.js','sassscr');
//console.log('Sass',window.Sass);
//$('body').css('opacity','0');
(function(){
  const NL="\n";
  let s='';
  s+='body{'+NL;
  s+='  opacity:0;'+NL;
  s+='}'+NL;
  s+='body.fadein{'+NL;
  s+='  opacity:1;'+NL;
  s+='  transition:1s;'+NL;
  s+='}'+NL;
  __.utils.updateNamedStyle(s,'baseStyle');
}());
setTimeout(function(){
  __.init._init();
},2000);


