import { Component, OnInit } from '@angular/core';
import * as angular from "angular";



@Component({
    selector: 'twitter-button',
    templateUrl: './view.html',
    styleUrls: []
  })

export class TwitterButtonController
{
    href: string;

    static $inject = ['$window'];
    ttitle = "aaa";
    

    constructor(
    )
    {
        this.href = "http://twitter.com/share?text=あなた好みにPLENを動かそう！「PLEN - Motion Editor for Web.」は、誰でも簡単にPLENのモーションを作成できるwebアプリです。&url=http://plen.jp/playground/motion-editor/&hashtags=PLEN";
    }

    onClick(): void
    {
        window.open(
            encodeURI(this.href),
            'tweeter_window',
            'width=650,height=470,menubar=no,toolbar=no,location=no,scrollbars=yes,sizable=yes'
        );
    }
}  