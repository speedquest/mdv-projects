//
//  DetailViewController.h
//  MDF2_Calendar_Week1
//
//  Created by Nicholas Weil on 10/24/12.
//  Copyright (c) 2012 Nicholas Weil. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <EventKit/EventKit.h>


@interface DetailViewController : UIViewController <UIPickerViewDelegate, UIPickerViewDataSource, UIActionSheetDelegate, UITableViewDataSource, UITableViewDelegate>

{
    NSString *savedTitle;
    NSDate *savedDate;
    NSString *savedLocation;
    IBOutlet UILabel *theTitle;
    IBOutlet UILabel *theDate;
    IBOutlet UILabel *theLocation;
    IBOutlet UIButton *addToCalButton;
    IBOutlet UIButton *setCal;
    IBOutlet UIButton *defaultCal;
    IBOutlet UITableView *theTableView;
    // EKEventStore *eventStore;
    NSArray *calendars;
    NSMutableArray *calArray;
    IBOutlet UIPickerView *pickerView;
    
}

@property (nonatomic, strong) NSString *savedTitle;
@property (nonatomic, strong) NSDate *savedDate;
@property (nonatomic, strong) NSString *savedLocation;
@property (nonatomic, strong) NSArray *calendars;
@property (strong, nonatomic) NSString *calendarChoice;

-(void)passTitle:(NSString *)passedTitle passDate:(NSDate *)passedDate passLocation:(NSString *)loc;
-(IBAction)addToCal:(id)sender;
-(IBAction)showCals:(id)sender;
-(IBAction)onClose:(id)sender;
-(IBAction)onclick:(id)sender;


@end
