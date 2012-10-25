//
//  DetailViewController.m
//  MDF2_Calendar_Week1
//
//  Created by Nicholas Weil on 10/24/12.
//  Copyright (c) 2012 Nicholas Weil. All rights reserved.
//

#import "DetailViewController.h"

@interface DetailViewController ()

@end

@implementation DetailViewController

@synthesize savedDate, savedTitle, savedLocation, calendars, calendarChoice;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    self.navigationController.navigationBar.tintColor = [UIColor colorWithRed:0.0 green:0.5 blue:0.5 alpha:1.0];
    theTableView.hidden = true;
    
    calArray = [[NSMutableArray alloc] init];
    
    EKEventStore *eventStore = [[EKEventStore alloc] init];
    if (eventStore != nil)
    {
        calendars = [eventStore calendars];
        NSDate *startDate = [NSDate date];
        NSDate *endDate = [[NSDate alloc]initWithTimeInterval:86400 sinceDate:startDate];
        NSPredicate *predicate = [eventStore predicateForEventsWithStartDate:startDate endDate:endDate calendars:nil];
        NSArray *myEvents = [eventStore eventsMatchingPredicate:predicate];
        if (myEvents != nil)
        {
            NSLog(@"start %@", [myEvents description]);
        }
        NSArray *calendars2 = [eventStore calendars];
        if (calendars2 != nil)
        {
            for (int i=0; i<[calendars2 count]; i++)
            {
                EKCalendar *calendar3 = [calendars2 objectAtIndex:i];
                NSLog(@"%@", calendar3.title);
                NSString *name = calendar3.title;
                [calArray addObject:name];
            }
        }
        
        [pickerView selectRow:1 inComponent:0 animated:NO];
    }
    
    setCal.hidden = true;
    pickerView.hidden = true;
    
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
}

- (void)passTitle:(NSString *)passedTitle passDate:(NSDate *)passedDate passLocation:(NSString *)loc
{
    self.title = passedTitle;
    NSDateFormatter *dateFormat = [[NSDateFormatter alloc] init];
    [dateFormat setDateFormat:@"MM-dd-yyyy 'at' HH:mm"];
    NSDate *tDate = passedDate;
    NSString *fDate = [dateFormat stringFromDate:tDate];
    theDate.text = fDate;
    theTitle.text = passedTitle;
    theLocation.text = loc;
}

- (NSInteger)numberOfComponentsInPickerView:(UIPickerView *)pickerView
{
    return 1;
}

// returns the # of rows in each component..
- (NSInteger)pickerView:(UIPickerView *)pickerView numberOfRowsInComponent:(NSInteger)component;
{
    return [calArray count];
}

- (NSString *)pickerView:(UIPickerView *)pickerView titleForRow:(NSInteger)row forComponent:(NSInteger)component;
{
    calendars = [calArray objectAtIndex:row];
    return [calArray objectAtIndex:row];
    
}
- (NSInteger)selectedRowInComponent:(NSInteger)component
{
    NSLog(@"%i", component);
    return component;
}

- (void)pickerView:(UIPickerView *)pV didSelectRow:(NSInteger)row inComponent:(NSInteger)component
{
    calendarChoice = [calArray objectAtIndex:row];
    
    
}


- (IBAction)addToCal:(id)sender
{
    UIActionSheet *popupQuery = [[UIActionSheet alloc] initWithTitle:@"Save to Calendar?" delegate:self cancelButtonTitle:@"Cancel" destructiveButtonTitle:@"NO" otherButtonTitles:@"YES", nil];
    
    popupQuery.actionSheetStyle = UIActionSheetStyleBlackOpaque;
    
    [popupQuery showInView:self.view];
}

-(void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex {
    
    if (buttonIndex == 0) {
        
        NSLog(@"Event Not saved");
        
    } else if (buttonIndex == 1)
	{
        EKEventStore *eventStore = [[EKEventStore alloc] init];
        [eventStore requestAccessToEntityType:EKEntityTypeEvent completion:^(BOOL granted, NSError *error) {
            
            
            EKEvent *newEvent = [EKEvent eventWithEventStore:eventStore];
            if (newEvent != nil)
            {
                newEvent.title = theTitle.text;
                
                NSDateFormatter *inputFormatter = [[NSDateFormatter alloc] init];
                [inputFormatter setDateFormat:@"MM-dd-yyyy 'at' HH:mm"];
                NSDate *formatterDate = [inputFormatter dateFromString:theDate.text];
                
                NSLog(@"Date %@", formatterDate);
                
                
                //NSDate *mydate = savedDate;
                newEvent.startDate = formatterDate;
                newEvent.endDate = [[NSDate alloc] initWithTimeInterval:7200 sinceDate:newEvent.startDate];
                
                if (calendarChoice != nil) {
                    NSLog(@"%@", calendarChoice);
                    newEvent.calendar = [eventStore calendarWithIdentifier:(NSString *)calendarChoice];
                }else {
                    newEvent.calendar = [eventStore defaultCalendarForNewEvents];
                }
                
                //newEvent.calendar = [eventStore defaultCalendarForNewEvents];
                
                [eventStore saveEvent:newEvent span:EKSpanThisEvent error:nil];
                
                NSLog(@"Added to Cal");
            }}];
        
        
	} else if (buttonIndex == 2) {
        
        NSLog(@"Canceled");
    }
}

-(IBAction)onClose:(id)sender
{
    [self dismissModalViewControllerAnimated:true];
}

- (IBAction)showCals:(id)sender
{
    theTableView.hidden = false;
    setCal.hidden = false;
    pickerView.hidden = false;
}

-(IBAction)onclick:(id)sender
{
    pickerView.hidden = true;
    setCal.hidden = true;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
