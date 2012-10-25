//
//  ViewController.h
//  MDF2_Calendar_Week1
//
//  Created by Nicholas Weil on 10/24/12.
//  Copyright (c) 2012 Nicholas Weil. All rights reserved.
//

#import <UIKit/UIKit.h>
typedef void (^theManipulator)(NSString*);


@interface ViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>
{
    IBOutlet UITableView *theTableView;
    NSMutableArray *events;
    NSMutableArray *dates;
    NSMutableArray *places;
    
}

@property (nonatomic, strong) NSArray *calendars;
@property (nonatomic, copy) NSMutableArray *events;
@property (nonatomic, copy) NSMutableArray *dates;
@property (nonatomic, copy) NSMutableArray *places;
@property (nonatomic, strong) theManipulator manipulator;

@end
